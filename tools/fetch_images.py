#!/usr/bin/env python3
"""
Fetch one openly-licensed photo per species from Wikipedia's page-image API and
save it into images/<species_slug>.jpg — the naming the viewer expects.

Wikipedia's lead images are Wikimedia Commons files (public-domain or CC). We ask
the action API for the page's primary image at a viewer-friendly size, then follow
the URL and save the bytes. Anything that can't be fetched is simply skipped — the
app falls back to its labelled placeholder, so the tool still looks complete.

It also records attribution: every Wikimedia photo keeps its own author + licence,
so after fetching it writes images/CREDITS.md crediting each one (the repo's own
licence does NOT cover these third-party images — their terms travel with them).

Usage:
    python3 tools/fetch_images.py            # fetch missing images, then write CREDITS.md
    python3 tools/fetch_images.py --force    # re-fetch everything, then write CREDITS.md
    python3 tools/fetch_images.py --credits  # only (re)generate images/CREDITS.md
"""

import csv
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
IMAGES = os.path.join(ROOT, "images")
CREDITS = os.path.join(IMAGES, "CREDITS.md")
UA = "TaxonomyViewer/1.0 (educational; morphology-first taxonomy viewer)"
THUMB = 500  # px on the long edge — crisp but small enough to stay offline-light

# Some rows resolve better via a curated Wikipedia title than the raw binomial
# (domesticated forms, or where the binomial redirects somewhere unhelpful).
TITLE_OVERRIDES = {
    "Homo sapiens": "Human",
    "Canis lupus familiaris": "Dog",
    "Felis catus": "Cat",
    "Mus musculus": "House mouse",
    "Rattus norvegicus": "Brown rat",
    "Bambusa vulgaris": "Bambusa vulgaris",
    "Culex quinquefasciatus": "Culex quinquefasciatus",
}


def slug(name):
    return name.strip().lower().replace(" ", "_").replace("'", "").replace(".", "")


def species_rows():
    """[(common_name, scientific_name)] across both CSVs, in file order."""
    out = []
    for fname in ("animals.csv", "plants.csv"):
        with open(os.path.join(DATA, fname), newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                sci = row.get("species", "").strip()
                if sci:
                    out.append((row.get("common_name", "").strip(), sci))
    return out


def species_list():
    return [sci for _, sci in species_rows()]


def _open(url, timeout):
    """Open a URL with polite retry/backoff on rate limits (HTTP 429)."""
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    delay = 2.0
    for attempt in range(6):
        try:
            return urllib.request.urlopen(req, timeout=timeout)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 5:
                time.sleep(delay)
                delay *= 2
                continue
            raise


def get_json(url):
    with _open(url, 30) as resp:
        return json.load(resp)


def page_image_url(title):
    """Return the URL of the page's primary image at ~THUMB px, or None."""
    api = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query",
        "prop": "pageimages",
        "piprop": "thumbnail",
        "pithumbsize": THUMB,
        "titles": title,
        "redirects": 1,
        "format": "json",
    })
    data = get_json(api)
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        thumb = page.get("thumbnail", {})
        if thumb.get("source"):
            return thumb["source"]
    return None


def download(url, dest):
    with _open(url, 60) as resp:
        data = resp.read()
    with open(dest, "wb") as fh:
        fh.write(data)
    return len(data)


# ---------------------------------------------------------------- attribution
def _clean(s):
    """Wikimedia metadata is HTML — strip tags, unescape entities, collapse space."""
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    return re.sub(r"\s+", " ", s).strip()


def image_meta(title):
    """Author + licence + source page for a Wikipedia page's lead image, or None."""
    api = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "prop": "pageimages", "piprop": "name",
        "titles": title, "redirects": 1, "format": "json",
    })
    fname = None
    for _, page in get_json(api).get("query", {}).get("pages", {}).items():
        if page.get("pageimage"):
            fname = page["pageimage"]
            break
    if not fname:
        return None
    api2 = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "titles": "File:" + fname, "prop": "imageinfo",
        "iiprop": "extmetadata|url", "format": "json",
    })
    for _, page in get_json(api2).get("query", {}).get("pages", {}).items():
        infos = page.get("imageinfo")
        if not infos:
            continue
        info = infos[0]
        ext = info.get("extmetadata", {})
        val = lambda k: ext.get(k, {}).get("value")  # noqa: E731
        return {
            "file": fname,
            "artist": _clean(val("Artist")) or "Unknown / see source",
            "license": _clean(val("LicenseShortName")) or "see source page",
            "license_url": (val("LicenseUrl") or "").strip(),
            "source": info.get("descriptionurl")
            or ("https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(fname)),
        }
    return None


def write_credits(rows):
    """Write images/CREDITS.md crediting each species photo's author + licence."""
    cell = lambda s: str(s).replace("|", "\\|")  # noqa: E731 — keep table intact
    lines = [
        "# Image credits",
        "",
        "The species photos in this folder come from **Wikimedia Commons / Wikipedia**.",
        "Each one keeps its **own author and licence** — the repository's own licence does",
        "**not** cover them. If you reuse a photo, credit its author and follow its licence",
        "(linked below). Public-domain photos need no permission; a credit is still courteous.",
        "",
        "_Generated by `tools/fetch_images.py` — re-run `python3 tools/fetch_images.py --credits`",
        "after changing the image set._",
        "",
        "| File | Species | Author | Licence | Source |",
        "|---|---|---|---|---|",
    ]
    n = 0
    for common, sci in rows:
        fn = slug(sci) + ".jpg"
        if not os.path.exists(os.path.join(IMAGES, fn)):
            continue
        title = TITLE_OVERRIDES.get(sci, sci)
        try:
            meta = image_meta(title)
        except Exception as e:  # noqa: BLE001 — best effort
            print(f"  meta FAIL {sci}: {e}")
            meta = None
        who = f"{sci}" + (f" ({common})" if common else "")
        if meta:
            lic = (f"[{cell(meta['license'])}]({meta['license_url']})"
                   if meta["license_url"] else cell(meta["license"]))
            lines.append(f"| `{fn}` | *{cell(who)}* | {cell(meta['artist'])} | {lic} "
                         f"| [Wikimedia]({meta['source']}) |")
            print(f"  credit {fn:<32} {meta['license']}  <- {meta['artist'][:40]}")
        else:
            lines.append(f"| `{fn}` | *{cell(who)}* | — | see source | — |")
            print(f"  credit {fn:<32} (no metadata)")
        n += 1
        time.sleep(1.0)
    with open(CREDITS, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    print(f"\nWrote {os.path.relpath(CREDITS, ROOT)} — {n} images credited.")


def main():
    os.makedirs(IMAGES, exist_ok=True)
    rows = species_rows()

    if "--credits" in sys.argv:  # only (re)generate attribution
        write_credits(rows)
        return

    force = "--force" in sys.argv
    species = [sci for _, sci in rows]
    ok = skipped = failed = 0
    for sci in species:
        dest = os.path.join(IMAGES, slug(sci) + ".jpg")
        if os.path.exists(dest) and not force:
            skipped += 1
            print(f"  have  {os.path.basename(dest)}")
            continue
        title = TITLE_OVERRIDES.get(sci, sci)
        try:
            url = page_image_url(title)
            if not url:
                print(f"  MISS  {sci}  (no lead image for '{title}')")
                failed += 1
                continue
            n = download(url, dest)
            print(f"  got   {os.path.basename(dest):<32} {n//1024} KB  <- {title}")
            ok += 1
        except Exception as e:  # noqa: BLE001 — best-effort fetch, never fatal
            print(f"  FAIL  {sci}: {e}")
            failed += 1
        time.sleep(1.5)  # be polite to the API
    print(f"\nDone: {ok} fetched, {skipped} already present, {failed} missing.")
    print("Recording attribution…")
    write_credits(rows)


if __name__ == "__main__":
    main()

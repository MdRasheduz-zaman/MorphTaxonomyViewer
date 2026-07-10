#!/usr/bin/env python3
"""
Fetch one openly-licensed photo per species from Wikipedia's page-image API and
save it into images/<species_slug>.jpg — the naming the viewer expects.

Wikipedia's lead images are Wikimedia Commons files (public-domain or CC). We ask
the action API for the page's primary image at a viewer-friendly size, then follow
the URL and save the bytes. Anything that can't be fetched is simply skipped — the
app falls back to its labelled placeholder, so the tool still looks complete.

Usage:
    python3 tools/fetch_images.py            # fetch any species missing an image
    python3 tools/fetch_images.py --force    # re-fetch everything
"""

import csv
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
IMAGES = os.path.join(ROOT, "images")
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


def species_list():
    out = []
    for fname in ("animals.csv", "plants.csv"):
        with open(os.path.join(DATA, fname), newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                sci = row.get("species", "").strip()
                if sci:
                    out.append(sci)
    return out


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


def main():
    force = "--force" in sys.argv
    os.makedirs(IMAGES, exist_ok=True)
    species = species_list()
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


if __name__ == "__main__":
    main()

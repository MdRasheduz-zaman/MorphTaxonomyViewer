#!/usr/bin/env python3
"""
Build the viewer's dataset from human-friendly spreadsheets:

    data/animals.csv       (Kingdom Animalia) — one row per animal
    data/plants.csv        (Kingdom Plantae)  — one row per plant
    data/lineage_ref.csv   the "extended hierarchy": name,rank,parent

Each organism row only needs a `species` (the full binomial) plus its trait columns.
The FULL lineage (genus -> family -> order -> class -> phylum) is filled in
automatically from lineage_ref.csv, so you never retype "Mammalia, Chordata" for
every mammal — you record each taxon's parent once in the reference. You can still
override any rank by adding that column to the organism CSV, and `species_complex`
is read from the CSV when present.

Outputs:
    data/dataset.js    -> window.DATASET = {...}  (loaded by the viewer; offline-safe)

Usage:
    python3 tools/build.py            # build + validate
    python3 tools/build.py --check    # validate only (exit 1 on error)
    python3 tools/build.py --help-images
"""

import csv
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
OUT_JS = os.path.join(DATA, "dataset.js")

# Ordered taxonomic ranks the tree understands. A CSV need only fill the ones that
# apply; blanks are skipped. Kingdom is implied by which file the row is in.
# The full extended hierarchy from taxonomy.md, general → specific. A CSV/reference
# only fills the ranks that apply; blanks are skipped. Order (not column position)
# decides nesting, so intermediate ranks can be added for any lineage that has them.
RANK_ORDER = [
    "root",
    "domain", "subdomain",
    "kingdom", "subkingdom", "infrakingdom",
    "superphylum", "phylum", "subphylum", "infraphylum",
    "superclass", "class", "subclass", "infraclass", "parvclass",
    "supercohort", "cohort", "subcohort", "infracohort",
    "superorder", "order", "suborder", "infraorder", "parvorder",
    "superfamily", "family", "subfamily",
    "supertribe", "tribe", "subtribe",
    "genus", "subgenus", "section", "subsection", "series", "subseries",
    "species_complex", "species", "subspecies",
    "variety", "subvariety", "form", "subform",
]
RANK_LABELS = {
    "root": "Life",
    "domain": "Domain", "subdomain": "Subdomain",
    "kingdom": "Kingdom", "subkingdom": "Subkingdom", "infrakingdom": "Infrakingdom",
    "superphylum": "Superphylum", "phylum": "Phylum / Division",
    "subphylum": "Subphylum / Subdivision", "infraphylum": "Infraphylum",
    "superclass": "Superclass", "class": "Class", "subclass": "Subclass",
    "infraclass": "Infraclass", "parvclass": "Parvclass",
    "supercohort": "Supercohort", "cohort": "Cohort", "subcohort": "Subcohort",
    "infracohort": "Infracohort",
    "superorder": "Superorder", "order": "Order", "suborder": "Suborder",
    "infraorder": "Infraorder", "parvorder": "Parvorder",
    "superfamily": "Superfamily", "family": "Family", "subfamily": "Subfamily",
    "supertribe": "Supertribe", "tribe": "Tribe", "subtribe": "Subtribe",
    "genus": "Genus", "subgenus": "Subgenus", "section": "Section",
    "subsection": "Subsection", "series": "Series", "subseries": "Subseries",
    "species_complex": "Species complex", "species": "Species", "subspecies": "Subspecies",
    "variety": "Variety", "subvariety": "Subvariety", "form": "Form", "subform": "Subform",
}
# Columns that are metadata, not morphological characters.
# `unknown` (truthy) marks a row whose taxonomy the finder doesn't know yet: it is
# NOT grafted into the tree (and is exempt from the reach-a-phylum check) — instead
# it's collected into DATASET.unplaced for the Identify tab to place by morphology.
META_COLS = set(RANK_ORDER) | {"common_name", "image", "unknown"}
UNKNOWN_TRUE = {"yes", "y", "true", "1", "x", "unknown", "unplaced"}

KINGDOM_OF_FILE = {"animals.csv": "Animalia", "plants.csv": "Plantae"}
KINGDOM_TRAITS = {
    "Animalia": ["Multicellular, no cell walls", "Heterotrophic", "Develops from a blastula"],
    "Plantae": ["Cell walls of cellulose", "Photosynthetic (chlorophyll a & b)", "Alternation of generations"],
}


def humanize(key):
    return key.replace("_", " ").replace(" cm", " (cm)").capitalize()


def slug(name):
    return name.strip().lower().replace(" ", "_").replace("'", "").replace(".", "")


def read_csv(fname):
    path = os.path.join(DATA, fname)
    with open(path, newline="", encoding="utf-8") as fh:
        # restval="" so a row that predates a newly-added trailing column (e.g. the
        # optional `unknown` flag) reads as "" for it, not None — keeps .strip() safe.
        rows = list(csv.DictReader(fh, restval=""))
    return rows


def infer_schema(rows, trait_cols):
    """For each trait column decide numeric vs categorical, and numeric range."""
    schema = []
    for col in trait_cols:
        vals = [r[col].strip() for r in rows if r.get(col, "").strip()]
        if not vals:
            continue
        numeric = True
        nums = []
        for v in vals:
            try:
                nums.append(float(v))
            except ValueError:
                numeric = False
                break
        entry = {"key": col, "label": humanize(col),
                 "type": "numeric" if numeric else "categorical"}
        if numeric:
            entry["min"] = min(nums)
            entry["max"] = max(nums)
        schema.append(entry)
    return schema


def ensure_child(node, rank, name):
    for c in node["children"]:
        if c["name"] == name and c["rank"] == rank:
            return c
    child = {"rank": rank, "name": name, "children": []}
    node["children"].append(child)
    return child


def load_reference():
    """name -> (rank, parent) from lineage_ref.csv. Optional file."""
    path = os.path.join(DATA, "lineage_ref.csv")
    ref = {}
    if not os.path.exists(path):
        return ref
    with open(path, newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            name = row["name"].strip()
            if name:
                ref[name] = (row["rank"].strip(), row["parent"].strip())
    return ref


def resolve_lineage(sci, row, ref, errors, kingdom):
    """Return {rank: name} for phylum..genus, from the reference + any CSV overrides."""
    genus = row.get("genus", "").strip() or sci.split()[0]
    resolved = {}
    cur, guard, last_name = genus, 0, None
    while cur in ref and guard < 50:
        rank, parent = ref[cur]
        resolved[rank] = cur
        last_name = cur
        cur = parent
        guard += 1
    stop_at = cur  # first ancestor NOT in the reference: the kingdom if the chain is
                   # complete, otherwise a dangling parent the user forgot to define
    # explicit rank columns in the organism row win over the reference
    for rank in RANK_ORDER:
        if rank in row and row.get(rank, "").strip():
            resolved[rank] = row[rank].strip()
    if "genus" not in resolved:
        errors.append(
            f"{sci}: genus {genus!r} is not in lineage_ref.csv and no lineage "
            f"columns were given — add a row 'name={genus},rank=genus,parent=<family>'."
        )
    elif "phylum" not in resolved:
        # The chain never climbed to a phylum, so the organism would graft directly
        # under the kingdom and could never share a real ancestor (LCA) with the rest
        # of the tree — every organism must reach at least its phylum. This is almost
        # always a dangling `parent` partway up: name it and tell the user to continue
        # the chain until it connects to a taxon already in the tree.
        broke = stop_at and stop_at not in (kingdom, "Animalia", "Plantae")
        hint = (f"its ancestor {stop_at!r} has no row in lineage_ref.csv"
                if broke else "the chain never reaches a phylum")
        errors.append(
            f"{sci}: lineage stops at {last_name!r} and never reaches a phylum "
            f"({hint}). Add the missing 'name,rank,parent' rows up the chain until it "
            f"connects to a taxon already in the tree — ultimately a phylum whose "
            f"parent is {kingdom!r} — so the organism shares an ancestor (LCA) with "
            f"the others. Existing higher taxa can be reused; only add what's missing."
        )
    return resolved


def build(check_only=False):
    errors = []
    root = {"rank": "root", "name": "Life", "common": "All cellular life",
            "traits": ["Cell-based", "Nucleic-acid genome"], "children": []}
    eukarya = ensure_child(root, "domain", "Eukarya")
    eukarya["common"] = "Eukaryotes"
    eukarya["traits"] = ["Membrane-bound nucleus", "Organelles"]

    ref = load_reference()
    trait_schema = {}
    organisms = []
    unplaced = []          # rows flagged unknown: traits recorded, taxonomy not yet known
    seen_species = set()

    for fname, kingdom in KINGDOM_OF_FILE.items():
        rows = read_csv(fname)
        headers = list(rows[0].keys()) if rows else []
        trait_cols = [h for h in headers if h not in META_COLS]
        trait_schema[kingdom] = infer_schema(rows, trait_cols)

        king_node = ensure_child(eukarya, "kingdom", kingdom)
        king_node["common"] = "Animals" if kingdom == "Animalia" else "Land plants"
        king_node["traits"] = KINGDOM_TRAITS[kingdom]

        for r in rows:
            sci = r.get("species", "").strip()
            if not sci:
                errors.append(f"{fname}: a row is missing its species name")
                continue
            if sci in seen_species:
                errors.append(f"{fname}: duplicate species {sci!r}")
            seen_species.add(sci)

            # An "unknown" row is held aside for morphological identification, not
            # placed in the tree — so it skips lineage resolution and the phylum check.
            if (r.get("unknown") or "").strip().lower() in UNKNOWN_TRUE:
                traits = {c: r[c].strip() for c in trait_cols if (r.get(c) or "").strip()}
                entry = {"name": sci, "common": r.get("common_name", "").strip(),
                         "kingdom": kingdom, "trait_values": traits, "slug": slug(sci)}
                if (r.get("image") or "").strip():
                    entry["image"] = r["image"].strip()
                unplaced.append(entry)
                continue

            # Fill in the full lineage from the reference (+ any overrides).
            resolved = resolve_lineage(sci, r, ref, errors, kingdom)
            resolved["species"] = sci
            if r.get("species_complex", "").strip():
                resolved["species_complex"] = r["species_complex"].strip()
            if r.get("subspecies", "").strip():
                resolved["subspecies"] = r["subspecies"].strip()

            node = king_node
            last_rank = "kingdom"
            for rank in RANK_ORDER[RANK_ORDER.index("phylum"):]:
                val = resolved.get(rank, "")
                if not val:
                    continue
                if RANK_ORDER.index(rank) <= RANK_ORDER.index(last_rank):
                    errors.append(f"{sci}: rank {rank} not deeper than {last_rank}")
                node = ensure_child(node, rank, val)
                last_rank = rank

            if node["name"] != sci:
                errors.append(f"{sci}: lineage did not end at the species (check reference)")

            # Attach traits + metadata to the leaf.
            traits = {c: r[c].strip() for c in trait_cols if r.get(c, "").strip()}
            node["common"] = r.get("common_name", "").strip()
            node["kingdom"] = kingdom
            node["trait_values"] = traits
            node["slug"] = slug(sci)
            if r.get("image", "").strip():
                node["image"] = r["image"].strip()
            organisms.append({"species": sci, "kingdom": kingdom,
                              "common": node["common"], "traits": traits})

    # Validate structure.
    def walk(n, parent_i):
        ri = RANK_ORDER.index(n["rank"])
        for c in n.get("children", []):
            if RANK_ORDER.index(c["rank"]) <= ri:
                errors.append(f"{c['name']}: rank not deeper than parent {n['name']}")
            walk(c, ri)
        if not n.get("children") and n["rank"] != "species" and \
                RANK_ORDER.index(n["rank"]) < RANK_ORDER.index("species"):
            errors.append(f"{n['name']}: leaf is a {n['rank']}, expected species-or-below")
    walk(root, -1)

    if errors:
        print("VALIDATION FAILED:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    n_species = len(organisms)   # placed organisms only (unknown/unplaced excluded)
    n_nodes = 0
    def count(n):
        nonlocal n_nodes
        n_nodes += 1
        for c in n.get("children", []):
            count(c)
    count(root)
    print(f"OK: {n_species} organisms, {n_nodes} tree nodes, "
          f"{len(trait_schema['Animalia'])} animal + {len(trait_schema['Plantae'])} plant characters"
          + (f", {len(unplaced)} unknown/unplaced" if unplaced else "") + ".")

    if check_only:
        return

    doc = {
        "meta": {
            "title": "Morphology-First Taxonomy Viewer",
            "rank_order": RANK_ORDER,
            "rank_labels": RANK_LABELS,
            "similarity_anchor": "species",
        },
        "trait_schema": trait_schema,
        "tree": root,
        "unplaced": unplaced,
    }
    with open(OUT_JS, "w", encoding="utf-8") as fh:
        fh.write("// AUTO-GENERATED from data/animals.csv + data/plants.csv by tools/build.py\n")
        fh.write("// Edit the CSVs (any spreadsheet) and re-run: python3 tools/build.py\n")
        fh.write("window.DATASET = ")
        json.dump(doc, fh, ensure_ascii=False, indent=2)
        fh.write(";\n")
    print(f"Wrote {os.path.relpath(OUT_JS, ROOT)}")


if __name__ == "__main__":
    if "--help-images" in sys.argv:
        print("Image naming convention (drop real photos in images/):")
        print("  whole organism : images/<species_slug>.jpg      e.g. images/homo_sapiens.jpg")
        print("                   (tools/fetch_images.py fills these from Wikipedia)")
        print("  one organism's character (optional close-up, overrides the whole photo):")
        print("                   images/<species_slug>/<trait_key>.<ext>")
        print("                   e.g. images/panthera_leo/dentition.jpg")
        print("  <ext> may be jpg / png / webp / gif (animation) / mp4 / webm (short video).")
        print("Comparison cards show the two REAL organisms side by side; media connect")
        print("purely by file name. Anything missing shows a 'no photo yet' card.")
        sys.exit(0)
    build(check_only="--check" in sys.argv)

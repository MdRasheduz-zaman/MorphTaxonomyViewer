# Building & organizing the datasets

Everything the viewer shows comes from **two spreadsheets** you can edit in Excel, LibreOffice or
Google Sheets:

- `data/animals.csv` — Kingdom **Animalia**, one row per animal.
- `data/plants.csv` — Kingdom **Plantae**, one row per plant.

`python3 tools/build.py` reads both, builds the tree, infers the trait types, and writes
`data/dataset.js` (which the browser loads offline). No JSON hand-editing.

## Why two files, not one

A plant has no `body_covering`; an animal has no `leaf_venation`. Putting them in one table means
every row is half-empty, and the similarity maths would compare characters that don't apply. So the
trait vocabularies are **kept separate on purpose**. A consequence, by design: comparing an animal
with a plant yields *no* morphological similarity (they share no characters) — only the taxonomic
reference relates them. That is the honest answer, and the tool says so.

## Column types

Each CSV has two kinds of columns.

**1. Lineage columns** (place the organism in the tree). Fill the ones that apply; leave the rest
blank. Order matters top-to-bottom, not left-to-right, so blanks are simply skipped.

```
animals.csv : common_name, phylum, class, order, family, genus, species_complex, species
plants.csv  : common_name, phylum, class, order, family, subfamily, tribe, genus, species
```

- `species` must be the full binomial (e.g. `Homo sapiens`) and is the leaf in the tree.
- `common_name` is the plain-language label.
- Kingdom is implied by the file, so there is no kingdom column.
- The **full extended hierarchy** from `taxonomy.md` is recognised, so a lineage can be as coarse or
  as fine as your data allows (fill only the ranks that apply): `domain, subdomain, kingdom,
  subkingdom, infrakingdom, superphylum, phylum, subphylum, infraphylum, superclass, class, subclass,
  infraclass, parvclass, supercohort, cohort, subcohort, infracohort, superorder, order, suborder,
  infraorder, parvorder, superfamily, family, subfamily, supertribe, tribe, subtribe, genus, subgenus,
  section, subsection, series, subseries, species_complex, species, subspecies, variety, subvariety,
  form, subform`. Order (not column position) decides nesting — blanks are simply skipped. The shared
  hierarchy lives once in `data/lineage_ref.csv` (`name,rank,parent`); an organism row only needs its
  `species`, and can override any rank with a matching column if needed.

**2. Trait columns** (everything else). Each is one **morphological character**. The build script
auto-detects the type from the values:

- **Numeric** if every value is a number (e.g. `limb_count`, `plant_height_cm`). Similarity for a
  numeric character is `1 − |a−b| / (max−min across the dataset)` — closer values score higher.
- **Categorical** otherwise (e.g. `body_covering = hair`). Similarity is 1 if equal, 0 if not.

Use **consistent vocabulary** in a categorical column (`fibrous` / `taproot`, not `fibrous roots`
in one row and `fibrous` in another) — the match is exact string comparison.

**Visible characters only (by design).** Every column is a trait a student could record in the field
by **eye, camera, or ruler** — no dissection, microscope, or lab. That's why the ships-with columns
cover the outside of an organism (covering, colour, markings, body regions, eyes, mouth, dentition,
limbs, feet, claws, tail, leaf/flower/fruit form, …) and **not** internal or biochemical traits
(heart chambers, blood pigment, vascular cross-section, C3/C4, …). This is a scope, not a limitation:
the maths, the tree, and the two similarity numbers work identically for *any* character a contributor
adds later — a richer set simply narrows the morphology↔taxonomy gap (less "underfitting").

**Grow it like a template.** The CSVs are meant to be a field-collection template: add a **row** per
organism you record, add a **column** for any visible character you can score, and leave cells you
didn't observe **blank** (blanks are skipped in the maths — partial data is fine). The seed rows are
populated so the app has something to show; you do not have to fill every cell.

Current visible columns (extend or rename freely):

```
animals: body_covering, coloration, markings, countershading, body_length_cm, posture, symmetry,
         body_regions, segmentation, skeleton_position, backbone, snout, eyes, eye_position, pinnae,
         vibrissae, antennae, mouth, dentition, cranial_appendages, limb_count, appendages,
         foot_posture, claw_type, wings, locomotion, tail, tail_form, reproduction, mammary_glands,
         metamorphosis, diet, habitat
plants:  growth_form, lifespan, plant_height_cm, leaf_arrangement, leaf_complexity, leaf_shape,
         leaf_venation, leaf_margin, leaf_apex, leaf_attachment, pubescence, stem_type, stem_surface,
         wood, tendrils, root_system, flower_symmetry, perianth, petal_fusion, flower_parts,
         flower_color, flower_size, inflorescence, pollination, fruit_type, fruit_dehiscence,
         fruit_color, seed_count, seed_habit, cotyledons, economic_use
```

## The two similarity numbers

For any pair the viewer shows both, and interprets the gap:

| Number | Where it comes from | Meaning |
|---|---|---|
| **Taxonomic reference** | the rank of the lowest common ancestor, anchored so species = 100% | the accepted "truth" level of relatedness |
| **Morphological match** | Gower average over the characters *both* organisms have filled | how alike your recorded form actually is |

Read the gap:
- **morph < taxonomic** → the dataset under-captures a known relationship → *add more shared
  characters*.
- **morph ≫ taxonomic** → they look more alike than their lineage split → convergence, or a
  **species complex** the recorded characters can't resolve.
- **no shared characters** (cross-kingdom) → only lineage can relate them.

"Coverage" (how many characters both organisms have filled) is shown too; a low number means the
estimate is weak regardless of the percentage.

## Group ("why they group") traits are computed, not typed

You do **not** hand-write the diagnostic traits of Mammalia or Poaceae. When you inspect a group,
the viewer computes the characters whose value is **identical across every member** and lists them.
Record good species-level traits and the group-level story falls out automatically and stays
consistent with the data.

## Images (by naming convention — no image columns to manage)

**Whole-organism photos.** Drop a file in `images/` named after the species slug (lowercase, spaces
→ `_`, drop apostrophes/dots), e.g. `images/homo_sapiens.jpg`. `python3 tools/fetch_images.py` pulls
one openly-licensed photo per species from Wikipedia automatically; it skips species that already
have a file, so hand-placed images are never overwritten. You can also set an explicit path/URL in an
optional `image` column to override a single row.

**Trait images (photo, GIF/animation, or short video).** Every shared/differing character in a
comparison shows the **two real organisms side by side** — the actual A and B, never a generic
"state" picture (a cat's *live birth* is not an aphid's). Media connect **purely by file name** — no
image columns, and no editing is done in code; you (or contributors) prepare and annotate media
externally, then drop the file in. For each side the viewer resolves, most specific first:

```
1. images/<species_slug>/<trait_key>.(jpg|png|webp|gif|mp4|webm)   a close-up of THIS organism's
                                                     character  e.g. images/felis_catus/dentition.jpg
                                                     (a GIF or short clip works just as well)
2. images/<species_slug>.(jpg|png|webp|gif|mp4|webm)              the organism's own whole media
3. a "no photo yet" card                                          honest placeholder, invites a drop-in
```

`.gif` and animated `.webp` animate on their own; `.mp4` / `.webm` play muted, looped, and are
click-to-zoom with controls. So out of the box a cat-vs-dog comparison shows a cat and a dog on every
card; add `images/panthera_leo/dentition.jpg` (or `.gif`/`.mp4`) and that card shows the lion's teeth
specifically — the best case is a real close-up of each character, prepared however you like. There is
no generated/annotated image layer inside the app by design. For a **group** in a slot, the
representative is its first member (a real species, not a mock-up).

Nothing is ever auto-drawn or substituted: if no media exists the card reads *"no photo yet"*, so the
comparison stays honest and it's obvious where a contribution is welcome — ideal for an open dataset
people grow over time. Every real photo/clip is click-to-zoom in the app. **Wikimedia Commons**
`Special:FilePath` links are a good openly-licensed source.

Each organism already has a scaffolded folder (`images/<slug>/`, kept by a `.gitkeep`) waiting for its
character close-ups. The **slug must match the CSV `species` letter-for-letter** — the full rules,
with examples, are in **[images/README.md](../images/README.md)**. Third-party photos must be credited
in **[images/CREDITS.md](../images/CREDITS.md)**.

## Where to get reliable classifications

| Source | Best for |
|---|---|
| **GBIF Backbone** (gbif.org) | everything; API + species match |
| **Catalogue of Life** (catalogueoflife.org) | the consensus checklist |
| **ITIS** (itis.gov) | animals |
| **World Flora Online / POWO** (powo.science.kew.org) | plants (Kew authority) |
| **WoRMS** (marinespecies.org) | marine organisms |
| **Wikispecies / Wikipedia** | quick lineage + trait prose to cross-check |

Workflow: get the accepted lineage from GBIF/COL → fill the lineage columns → read the diagnostic
characters used in identification keys/floras/faunas → record them as trait columns, using the same
wording across rows so equal states actually match.

## Validate any time

```bash
python3 tools/build.py --check   # lineages only, exit 1 on error
python3 tools/build.py           # build dataset.js
```

## Scope & honesty

Morphology-first classification is field-usable and powerful, but it has limits the tool is built
to expose rather than hide: **convergence** (look-alikes that aren't close) and **cryptic species /
complexes** (close things that look identical). The *Culex pipiens* rows are included precisely
because our current characters give them 100% morphological match while taxonomy knows they are
distinct — a live demonstration of where more (or finer) data is needed.

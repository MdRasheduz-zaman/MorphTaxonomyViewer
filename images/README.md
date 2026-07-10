# Images — naming convention (read before adding media)

The viewer finds media **purely by file name**, so the naming must be **exactly
consistent** or the app won't locate your file. There are no image columns in the CSVs.

## The slug (the one rule that matters)

Every organism has a **slug** derived from its `species` value (plus any infraspecific
rank) in `data/animals.csv` / `data/plants.csv`:

> lowercase → spaces become `_` → drop apostrophes and dots

so the slug reads **`genus_species[_infraspecific]`**. Examples:

| `species` in the CSV | slug |
|---|---|
| `Homo sapiens` | `homo_sapiens` |
| `Panthera leo` | `panthera_leo` |
| `Canis lupus familiaris` | `canis_lupus_familiaris` |

This is the same slug `tools/build.py` computes, so **match it letter-for-letter**.

## Where media go

```
images/<slug>.jpg                    ← the organism's main photo (whole animal/plant)
images/<slug>/<trait_key>.<ext>      ← a close-up of ONE character of THAT organism
images/<slug>/.gitkeep               ← keeps the (initially empty) folder in git
```

- `<trait_key>` is the **column name** in the CSV, verbatim — e.g. `dentition`,
  `leaf_venation`, `claw_type`, `flower_color`.
- `<ext>` may be **jpg · png · webp · gif** (animation) **· mp4 · webm** (short video).
  GIFs and animated WebP animate on their own; mp4/webm play muted and looped.

Example — a photo of a lion's teeth and a clip of a mosquito feeding:

```
images/panthera_leo/dentition.jpg
images/aedes_aegypti/mouth.mp4
```

## How the app picks a file (most specific first)

For each organism on a comparison card:

1. `images/<slug>/<trait_key>.(jpg|png|webp|gif|mp4|webm)` — this organism's character
2. `images/<slug>.(jpg|png|webp|gif|mp4|webm)` — its main photo (fallback)
3. a **"no photo yet"** card — honest placeholder inviting a contribution

So out of the box a card shows the whole organism; drop a close-up in its folder and
that card upgrades to the specific character.

## Prepare media OUTSIDE the app

Any cropping, labelling, arrows or highlighting must be done in **your own image/video
editor before** you drop the file in — the app does no editing, it only displays. That
keeps the tool simple and the logic identical no matter what media you add later.

## Licensing

If a photo isn't your own, record its author + licence + source in
[`CREDITS.md`](CREDITS.md) (the seed photos are already listed there). The repository's
own licence does **not** cover third-party images.

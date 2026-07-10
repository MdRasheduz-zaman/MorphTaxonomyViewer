// AUTO-GENERATED from data/animals.csv + data/plants.csv by tools/build.py
// Edit the CSVs (any spreadsheet) and re-run: python3 tools/build.py
window.DATASET = {
  "meta": {
    "title": "Morphology-First Taxonomy Viewer",
    "rank_order": [
      "root",
      "domain",
      "subdomain",
      "kingdom",
      "subkingdom",
      "infrakingdom",
      "superphylum",
      "phylum",
      "subphylum",
      "infraphylum",
      "superclass",
      "class",
      "subclass",
      "infraclass",
      "parvclass",
      "supercohort",
      "cohort",
      "subcohort",
      "infracohort",
      "superorder",
      "order",
      "suborder",
      "infraorder",
      "parvorder",
      "superfamily",
      "family",
      "subfamily",
      "supertribe",
      "tribe",
      "subtribe",
      "genus",
      "subgenus",
      "section",
      "subsection",
      "series",
      "subseries",
      "species_complex",
      "species",
      "subspecies",
      "variety",
      "subvariety",
      "form",
      "subform"
    ],
    "rank_labels": {
      "root": "Life",
      "domain": "Domain",
      "subdomain": "Subdomain",
      "kingdom": "Kingdom",
      "subkingdom": "Subkingdom",
      "infrakingdom": "Infrakingdom",
      "superphylum": "Superphylum",
      "phylum": "Phylum / Division",
      "subphylum": "Subphylum / Subdivision",
      "infraphylum": "Infraphylum",
      "superclass": "Superclass",
      "class": "Class",
      "subclass": "Subclass",
      "infraclass": "Infraclass",
      "parvclass": "Parvclass",
      "supercohort": "Supercohort",
      "cohort": "Cohort",
      "subcohort": "Subcohort",
      "infracohort": "Infracohort",
      "superorder": "Superorder",
      "order": "Order",
      "suborder": "Suborder",
      "infraorder": "Infraorder",
      "parvorder": "Parvorder",
      "superfamily": "Superfamily",
      "family": "Family",
      "subfamily": "Subfamily",
      "supertribe": "Supertribe",
      "tribe": "Tribe",
      "subtribe": "Subtribe",
      "genus": "Genus",
      "subgenus": "Subgenus",
      "section": "Section",
      "subsection": "Subsection",
      "series": "Series",
      "subseries": "Subseries",
      "species_complex": "Species complex",
      "species": "Species",
      "subspecies": "Subspecies",
      "variety": "Variety",
      "subvariety": "Subvariety",
      "form": "Form",
      "subform": "Subform"
    },
    "similarity_anchor": "species"
  },
  "trait_schema": {
    "Animalia": [
      {
        "key": "body_covering",
        "label": "Body covering",
        "type": "categorical"
      },
      {
        "key": "coloration",
        "label": "Coloration",
        "type": "categorical"
      },
      {
        "key": "markings",
        "label": "Markings",
        "type": "categorical"
      },
      {
        "key": "countershading",
        "label": "Countershading",
        "type": "categorical"
      },
      {
        "key": "body_length_cm",
        "label": "Body length (cm)",
        "type": "numeric",
        "min": 0.3,
        "max": 250.0
      },
      {
        "key": "posture",
        "label": "Posture",
        "type": "categorical"
      },
      {
        "key": "symmetry",
        "label": "Symmetry",
        "type": "categorical"
      },
      {
        "key": "body_regions",
        "label": "Body regions",
        "type": "categorical"
      },
      {
        "key": "segmentation",
        "label": "Segmentation",
        "type": "categorical"
      },
      {
        "key": "skeleton_position",
        "label": "Skeleton position",
        "type": "categorical"
      },
      {
        "key": "backbone",
        "label": "Backbone",
        "type": "categorical"
      },
      {
        "key": "snout",
        "label": "Snout",
        "type": "categorical"
      },
      {
        "key": "eyes",
        "label": "Eyes",
        "type": "categorical"
      },
      {
        "key": "eye_position",
        "label": "Eye position",
        "type": "categorical"
      },
      {
        "key": "pinnae",
        "label": "Pinnae",
        "type": "categorical"
      },
      {
        "key": "vibrissae",
        "label": "Vibrissae",
        "type": "categorical"
      },
      {
        "key": "antennae",
        "label": "Antennae",
        "type": "categorical"
      },
      {
        "key": "mouth",
        "label": "Mouth",
        "type": "categorical"
      },
      {
        "key": "dentition",
        "label": "Dentition",
        "type": "categorical"
      },
      {
        "key": "cranial_appendages",
        "label": "Cranial appendages",
        "type": "categorical"
      },
      {
        "key": "limb_count",
        "label": "Limb count",
        "type": "numeric",
        "min": 4.0,
        "max": 6.0
      },
      {
        "key": "appendages",
        "label": "Appendages",
        "type": "categorical"
      },
      {
        "key": "foot_posture",
        "label": "Foot posture",
        "type": "categorical"
      },
      {
        "key": "claw_type",
        "label": "Claw type",
        "type": "categorical"
      },
      {
        "key": "wings",
        "label": "Wings",
        "type": "categorical"
      },
      {
        "key": "locomotion",
        "label": "Locomotion",
        "type": "categorical"
      },
      {
        "key": "tail",
        "label": "Tail",
        "type": "categorical"
      },
      {
        "key": "tail_form",
        "label": "Tail form",
        "type": "categorical"
      },
      {
        "key": "reproduction",
        "label": "Reproduction",
        "type": "categorical"
      },
      {
        "key": "mammary_glands",
        "label": "Mammary glands",
        "type": "categorical"
      },
      {
        "key": "metamorphosis",
        "label": "Metamorphosis",
        "type": "categorical"
      },
      {
        "key": "diet",
        "label": "Diet",
        "type": "categorical"
      },
      {
        "key": "habitat",
        "label": "Habitat",
        "type": "categorical"
      }
    ],
    "Plantae": [
      {
        "key": "growth_form",
        "label": "Growth form",
        "type": "categorical"
      },
      {
        "key": "lifespan",
        "label": "Lifespan",
        "type": "categorical"
      },
      {
        "key": "plant_height_cm",
        "label": "Plant height (cm)",
        "type": "numeric",
        "min": 90.0,
        "max": 3000.0
      },
      {
        "key": "leaf_arrangement",
        "label": "Leaf arrangement",
        "type": "categorical"
      },
      {
        "key": "leaf_complexity",
        "label": "Leaf complexity",
        "type": "categorical"
      },
      {
        "key": "leaf_shape",
        "label": "Leaf shape",
        "type": "categorical"
      },
      {
        "key": "leaf_venation",
        "label": "Leaf venation",
        "type": "categorical"
      },
      {
        "key": "leaf_margin",
        "label": "Leaf margin",
        "type": "categorical"
      },
      {
        "key": "leaf_apex",
        "label": "Leaf apex",
        "type": "categorical"
      },
      {
        "key": "leaf_attachment",
        "label": "Leaf attachment",
        "type": "categorical"
      },
      {
        "key": "pubescence",
        "label": "Pubescence",
        "type": "categorical"
      },
      {
        "key": "stem_type",
        "label": "Stem type",
        "type": "categorical"
      },
      {
        "key": "stem_surface",
        "label": "Stem surface",
        "type": "categorical"
      },
      {
        "key": "wood",
        "label": "Wood",
        "type": "categorical"
      },
      {
        "key": "tendrils",
        "label": "Tendrils",
        "type": "categorical"
      },
      {
        "key": "root_system",
        "label": "Root system",
        "type": "categorical"
      },
      {
        "key": "flower_symmetry",
        "label": "Flower symmetry",
        "type": "categorical"
      },
      {
        "key": "perianth",
        "label": "Perianth",
        "type": "categorical"
      },
      {
        "key": "petal_fusion",
        "label": "Petal fusion",
        "type": "categorical"
      },
      {
        "key": "flower_parts",
        "label": "Flower parts",
        "type": "categorical"
      },
      {
        "key": "flower_color",
        "label": "Flower color",
        "type": "categorical"
      },
      {
        "key": "flower_size",
        "label": "Flower size",
        "type": "categorical"
      },
      {
        "key": "inflorescence",
        "label": "Inflorescence",
        "type": "categorical"
      },
      {
        "key": "pollination",
        "label": "Pollination",
        "type": "categorical"
      },
      {
        "key": "fruit_type",
        "label": "Fruit type",
        "type": "categorical"
      },
      {
        "key": "fruit_dehiscence",
        "label": "Fruit dehiscence",
        "type": "categorical"
      },
      {
        "key": "fruit_color",
        "label": "Fruit color",
        "type": "categorical"
      },
      {
        "key": "seed_count",
        "label": "Seed count",
        "type": "categorical"
      },
      {
        "key": "seed_habit",
        "label": "Seed habit",
        "type": "categorical"
      },
      {
        "key": "cotyledons",
        "label": "Cotyledons",
        "type": "numeric",
        "min": 1.0,
        "max": 2.0
      },
      {
        "key": "economic_use",
        "label": "Economic use",
        "type": "categorical"
      }
    ]
  },
  "tree": {
    "rank": "root",
    "name": "Life",
    "common": "All cellular life",
    "traits": [
      "Cell-based",
      "Nucleic-acid genome"
    ],
    "children": [
      {
        "rank": "domain",
        "name": "Eukarya",
        "children": [
          {
            "rank": "kingdom",
            "name": "Animalia",
            "children": [
              {
                "rank": "phylum",
                "name": "Chordata",
                "children": [
                  {
                    "rank": "subphylum",
                    "name": "Vertebrata",
                    "children": [
                      {
                        "rank": "class",
                        "name": "Mammalia",
                        "children": [
                          {
                            "rank": "subclass",
                            "name": "Theria",
                            "children": [
                              {
                                "rank": "infraclass",
                                "name": "Eutheria",
                                "children": [
                                  {
                                    "rank": "superorder",
                                    "name": "Euarchontoglires",
                                    "children": [
                                      {
                                        "rank": "order",
                                        "name": "Primates",
                                        "children": [
                                          {
                                            "rank": "suborder",
                                            "name": "Haplorhini",
                                            "children": [
                                              {
                                                "rank": "parvorder",
                                                "name": "Catarrhini",
                                                "children": [
                                                  {
                                                    "rank": "superfamily",
                                                    "name": "Hominoidea",
                                                    "children": [
                                                      {
                                                        "rank": "family",
                                                        "name": "Hominidae",
                                                        "children": [
                                                          {
                                                            "rank": "subfamily",
                                                            "name": "Homininae",
                                                            "children": [
                                                              {
                                                                "rank": "genus",
                                                                "name": "Homo",
                                                                "children": [
                                                                  {
                                                                    "rank": "species",
                                                                    "name": "Homo sapiens",
                                                                    "children": [],
                                                                    "common": "Human",
                                                                    "kingdom": "Animalia",
                                                                    "trait_values": {
                                                                      "body_covering": "hair",
                                                                      "coloration": "variable",
                                                                      "markings": "none",
                                                                      "countershading": "no",
                                                                      "body_length_cm": "170",
                                                                      "posture": "bipedal",
                                                                      "symmetry": "bilateral",
                                                                      "body_regions": "head-neck-trunk-tail",
                                                                      "segmentation": "unsegmented",
                                                                      "skeleton_position": "internal",
                                                                      "backbone": "yes",
                                                                      "snout": "flat",
                                                                      "eyes": "two camera eyes",
                                                                      "eye_position": "frontal",
                                                                      "pinnae": "present",
                                                                      "vibrissae": "absent",
                                                                      "antennae": "none",
                                                                      "mouth": "jaws with teeth",
                                                                      "dentition": "heterodont teeth",
                                                                      "cranial_appendages": "none",
                                                                      "limb_count": "4",
                                                                      "appendages": "pentadactyl limbs",
                                                                      "foot_posture": "plantigrade",
                                                                      "claw_type": "nails",
                                                                      "wings": "none",
                                                                      "locomotion": "walk",
                                                                      "tail": "absent",
                                                                      "tail_form": "absent",
                                                                      "reproduction": "live birth",
                                                                      "mammary_glands": "present",
                                                                      "metamorphosis": "none",
                                                                      "diet": "omnivore",
                                                                      "habitat": "terrestrial"
                                                                    },
                                                                    "slug": "homo_sapiens"
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "rank": "superfamily",
                                                    "name": "Cercopithecoidea",
                                                    "children": [
                                                      {
                                                        "rank": "family",
                                                        "name": "Cercopithecidae",
                                                        "children": [
                                                          {
                                                            "rank": "subfamily",
                                                            "name": "Cercopithecinae",
                                                            "children": [
                                                              {
                                                                "rank": "genus",
                                                                "name": "Macaca",
                                                                "children": [
                                                                  {
                                                                    "rank": "species",
                                                                    "name": "Macaca mulatta",
                                                                    "children": [],
                                                                    "common": "Rhesus monkey",
                                                                    "kingdom": "Animalia",
                                                                    "trait_values": {
                                                                      "body_covering": "hair",
                                                                      "coloration": "brown",
                                                                      "markings": "none",
                                                                      "countershading": "yes",
                                                                      "body_length_cm": "50",
                                                                      "posture": "quadrupedal",
                                                                      "symmetry": "bilateral",
                                                                      "body_regions": "head-neck-trunk-tail",
                                                                      "segmentation": "unsegmented",
                                                                      "skeleton_position": "internal",
                                                                      "backbone": "yes",
                                                                      "snout": "short",
                                                                      "eyes": "two camera eyes",
                                                                      "eye_position": "frontal",
                                                                      "pinnae": "present",
                                                                      "vibrissae": "absent",
                                                                      "antennae": "none",
                                                                      "mouth": "jaws with teeth",
                                                                      "dentition": "heterodont teeth",
                                                                      "cranial_appendages": "none",
                                                                      "limb_count": "4",
                                                                      "appendages": "pentadactyl limbs",
                                                                      "foot_posture": "plantigrade",
                                                                      "claw_type": "nails",
                                                                      "wings": "none",
                                                                      "locomotion": "walk",
                                                                      "tail": "present",
                                                                      "tail_form": "furry",
                                                                      "reproduction": "live birth",
                                                                      "mammary_glands": "present",
                                                                      "metamorphosis": "none",
                                                                      "diet": "omnivore",
                                                                      "habitat": "terrestrial"
                                                                    },
                                                                    "slug": "macaca_mulatta"
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "rank": "order",
                                        "name": "Rodentia",
                                        "children": [
                                          {
                                            "rank": "suborder",
                                            "name": "Myomorpha",
                                            "children": [
                                              {
                                                "rank": "superfamily",
                                                "name": "Muroidea",
                                                "children": [
                                                  {
                                                    "rank": "family",
                                                    "name": "Muridae",
                                                    "children": [
                                                      {
                                                        "rank": "subfamily",
                                                        "name": "Murinae",
                                                        "children": [
                                                          {
                                                            "rank": "genus",
                                                            "name": "Mus",
                                                            "children": [
                                                              {
                                                                "rank": "species",
                                                                "name": "Mus musculus",
                                                                "children": [],
                                                                "common": "House mouse",
                                                                "kingdom": "Animalia",
                                                                "trait_values": {
                                                                  "body_covering": "hair",
                                                                  "coloration": "grey-brown",
                                                                  "markings": "none",
                                                                  "countershading": "yes",
                                                                  "body_length_cm": "9",
                                                                  "posture": "quadrupedal",
                                                                  "symmetry": "bilateral",
                                                                  "body_regions": "head-neck-trunk-tail",
                                                                  "segmentation": "unsegmented",
                                                                  "skeleton_position": "internal",
                                                                  "backbone": "yes",
                                                                  "snout": "pointed",
                                                                  "eyes": "two camera eyes",
                                                                  "eye_position": "lateral",
                                                                  "pinnae": "present",
                                                                  "vibrissae": "present",
                                                                  "antennae": "none",
                                                                  "mouth": "jaws with teeth",
                                                                  "dentition": "ever-growing incisors",
                                                                  "cranial_appendages": "none",
                                                                  "limb_count": "4",
                                                                  "appendages": "pentadactyl limbs",
                                                                  "foot_posture": "plantigrade",
                                                                  "claw_type": "claws",
                                                                  "wings": "none",
                                                                  "locomotion": "run",
                                                                  "tail": "present",
                                                                  "tail_form": "naked",
                                                                  "reproduction": "live birth",
                                                                  "mammary_glands": "present",
                                                                  "metamorphosis": "none",
                                                                  "diet": "herbivore",
                                                                  "habitat": "terrestrial"
                                                                },
                                                                "slug": "mus_musculus"
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "rank": "genus",
                                                            "name": "Rattus",
                                                            "children": [
                                                              {
                                                                "rank": "species",
                                                                "name": "Rattus norvegicus",
                                                                "children": [],
                                                                "common": "Brown rat",
                                                                "kingdom": "Animalia",
                                                                "trait_values": {
                                                                  "body_covering": "hair",
                                                                  "coloration": "brown",
                                                                  "markings": "none",
                                                                  "countershading": "yes",
                                                                  "body_length_cm": "25",
                                                                  "posture": "quadrupedal",
                                                                  "symmetry": "bilateral",
                                                                  "body_regions": "head-neck-trunk-tail",
                                                                  "segmentation": "unsegmented",
                                                                  "skeleton_position": "internal",
                                                                  "backbone": "yes",
                                                                  "snout": "pointed",
                                                                  "eyes": "two camera eyes",
                                                                  "eye_position": "lateral",
                                                                  "pinnae": "present",
                                                                  "vibrissae": "present",
                                                                  "antennae": "none",
                                                                  "mouth": "jaws with teeth",
                                                                  "dentition": "ever-growing incisors",
                                                                  "cranial_appendages": "none",
                                                                  "limb_count": "4",
                                                                  "appendages": "pentadactyl limbs",
                                                                  "foot_posture": "plantigrade",
                                                                  "claw_type": "claws",
                                                                  "wings": "none",
                                                                  "locomotion": "run",
                                                                  "tail": "present",
                                                                  "tail_form": "naked",
                                                                  "reproduction": "live birth",
                                                                  "mammary_glands": "present",
                                                                  "metamorphosis": "none",
                                                                  "diet": "omnivore",
                                                                  "habitat": "terrestrial"
                                                                },
                                                                "slug": "rattus_norvegicus"
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "rank": "superorder",
                                    "name": "Laurasiatheria",
                                    "children": [
                                      {
                                        "rank": "order",
                                        "name": "Carnivora",
                                        "children": [
                                          {
                                            "rank": "suborder",
                                            "name": "Feliformia",
                                            "children": [
                                              {
                                                "rank": "family",
                                                "name": "Felidae",
                                                "children": [
                                                  {
                                                    "rank": "subfamily",
                                                    "name": "Felinae",
                                                    "children": [
                                                      {
                                                        "rank": "genus",
                                                        "name": "Felis",
                                                        "children": [
                                                          {
                                                            "rank": "species",
                                                            "name": "Felis catus",
                                                            "children": [],
                                                            "common": "Domestic cat",
                                                            "kingdom": "Animalia",
                                                            "trait_values": {
                                                              "body_covering": "hair",
                                                              "coloration": "variable",
                                                              "markings": "none",
                                                              "countershading": "no",
                                                              "body_length_cm": "46",
                                                              "posture": "quadrupedal",
                                                              "symmetry": "bilateral",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "segmentation": "unsegmented",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "snout": "short",
                                                              "eyes": "two camera eyes",
                                                              "eye_position": "frontal",
                                                              "pinnae": "present",
                                                              "vibrissae": "present",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "cranial_appendages": "none",
                                                              "limb_count": "4",
                                                              "appendages": "pentadactyl limbs",
                                                              "foot_posture": "digitigrade",
                                                              "claw_type": "retractable claws",
                                                              "wings": "none",
                                                              "locomotion": "run",
                                                              "tail": "present",
                                                              "tail_form": "furry",
                                                              "reproduction": "live birth",
                                                              "mammary_glands": "present",
                                                              "metamorphosis": "none",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial"
                                                            },
                                                            "slug": "felis_catus"
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "rank": "subfamily",
                                                    "name": "Pantherinae",
                                                    "children": [
                                                      {
                                                        "rank": "genus",
                                                        "name": "Panthera",
                                                        "children": [
                                                          {
                                                            "rank": "species",
                                                            "name": "Panthera leo",
                                                            "children": [],
                                                            "common": "Lion",
                                                            "kingdom": "Animalia",
                                                            "trait_values": {
                                                              "body_covering": "hair",
                                                              "coloration": "tawny",
                                                              "markings": "none",
                                                              "countershading": "yes",
                                                              "body_length_cm": "200",
                                                              "posture": "quadrupedal",
                                                              "symmetry": "bilateral",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "segmentation": "unsegmented",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "snout": "short",
                                                              "eyes": "two camera eyes",
                                                              "eye_position": "frontal",
                                                              "pinnae": "present",
                                                              "vibrissae": "present",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "cranial_appendages": "none",
                                                              "limb_count": "4",
                                                              "appendages": "pentadactyl limbs",
                                                              "foot_posture": "digitigrade",
                                                              "claw_type": "retractable claws",
                                                              "wings": "none",
                                                              "locomotion": "run",
                                                              "tail": "present",
                                                              "tail_form": "tufted",
                                                              "reproduction": "live birth",
                                                              "mammary_glands": "present",
                                                              "metamorphosis": "none",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial"
                                                            },
                                                            "slug": "panthera_leo"
                                                          },
                                                          {
                                                            "rank": "species",
                                                            "name": "Panthera tigris",
                                                            "children": [],
                                                            "common": "Tiger",
                                                            "kingdom": "Animalia",
                                                            "trait_values": {
                                                              "body_covering": "hair",
                                                              "coloration": "orange",
                                                              "markings": "stripes",
                                                              "countershading": "yes",
                                                              "body_length_cm": "250",
                                                              "posture": "quadrupedal",
                                                              "symmetry": "bilateral",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "segmentation": "unsegmented",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "snout": "short",
                                                              "eyes": "two camera eyes",
                                                              "eye_position": "frontal",
                                                              "pinnae": "present",
                                                              "vibrissae": "present",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "cranial_appendages": "none",
                                                              "limb_count": "4",
                                                              "appendages": "pentadactyl limbs",
                                                              "foot_posture": "digitigrade",
                                                              "claw_type": "retractable claws",
                                                              "wings": "none",
                                                              "locomotion": "run",
                                                              "tail": "present",
                                                              "tail_form": "furry",
                                                              "reproduction": "live birth",
                                                              "mammary_glands": "present",
                                                              "metamorphosis": "none",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial"
                                                            },
                                                            "slug": "panthera_tigris"
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          },
                                          {
                                            "rank": "suborder",
                                            "name": "Caniformia",
                                            "children": [
                                              {
                                                "rank": "family",
                                                "name": "Canidae",
                                                "children": [
                                                  {
                                                    "rank": "subfamily",
                                                    "name": "Caninae",
                                                    "children": [
                                                      {
                                                        "rank": "genus",
                                                        "name": "Canis",
                                                        "children": [
                                                          {
                                                            "rank": "species",
                                                            "name": "Canis lupus familiaris",
                                                            "children": [],
                                                            "common": "Domestic dog",
                                                            "kingdom": "Animalia",
                                                            "trait_values": {
                                                              "body_covering": "hair",
                                                              "coloration": "variable",
                                                              "markings": "none",
                                                              "countershading": "no",
                                                              "body_length_cm": "60",
                                                              "posture": "quadrupedal",
                                                              "symmetry": "bilateral",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "segmentation": "unsegmented",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "snout": "elongated",
                                                              "eyes": "two camera eyes",
                                                              "eye_position": "frontal",
                                                              "pinnae": "present",
                                                              "vibrissae": "present",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "cranial_appendages": "none",
                                                              "limb_count": "4",
                                                              "appendages": "pentadactyl limbs",
                                                              "foot_posture": "digitigrade",
                                                              "claw_type": "non-retractable claws",
                                                              "wings": "none",
                                                              "locomotion": "run",
                                                              "tail": "present",
                                                              "tail_form": "furry",
                                                              "reproduction": "live birth",
                                                              "mammary_glands": "present",
                                                              "metamorphosis": "none",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial"
                                                            },
                                                            "slug": "canis_lupus_familiaris"
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "rank": "phylum",
                "name": "Arthropoda",
                "children": [
                  {
                    "rank": "subphylum",
                    "name": "Hexapoda",
                    "children": [
                      {
                        "rank": "class",
                        "name": "Insecta",
                        "children": [
                          {
                            "rank": "subclass",
                            "name": "Pterygota",
                            "children": [
                              {
                                "rank": "infraclass",
                                "name": "Neoptera",
                                "children": [
                                  {
                                    "rank": "order",
                                    "name": "Diptera",
                                    "children": [
                                      {
                                        "rank": "suborder",
                                        "name": "Nematocera",
                                        "children": [
                                          {
                                            "rank": "family",
                                            "name": "Culicidae",
                                            "children": [
                                              {
                                                "rank": "subfamily",
                                                "name": "Culicinae",
                                                "children": [
                                                  {
                                                    "rank": "genus",
                                                    "name": "Aedes",
                                                    "children": [
                                                      {
                                                        "rank": "species",
                                                        "name": "Aedes aegypti",
                                                        "children": [],
                                                        "common": "Yellow fever mosquito",
                                                        "kingdom": "Animalia",
                                                        "trait_values": {
                                                          "body_covering": "chitin",
                                                          "coloration": "black",
                                                          "markings": "stripes",
                                                          "countershading": "no",
                                                          "body_length_cm": "0.5",
                                                          "posture": "hexapod",
                                                          "symmetry": "bilateral",
                                                          "body_regions": "head-thorax-abdomen",
                                                          "segmentation": "segmented",
                                                          "skeleton_position": "external",
                                                          "backbone": "no",
                                                          "eyes": "compound eyes",
                                                          "eye_position": "lateral",
                                                          "pinnae": "absent",
                                                          "vibrissae": "absent",
                                                          "antennae": "one pair",
                                                          "mouth": "piercing proboscis",
                                                          "dentition": "none",
                                                          "cranial_appendages": "none",
                                                          "limb_count": "6",
                                                          "appendages": "jointed legs",
                                                          "claw_type": "tarsal claws",
                                                          "wings": "one pair",
                                                          "locomotion": "fly",
                                                          "tail": "absent",
                                                          "tail_form": "absent",
                                                          "reproduction": "lays eggs",
                                                          "mammary_glands": "absent",
                                                          "metamorphosis": "complete",
                                                          "diet": "blood-nectar",
                                                          "habitat": "aerial"
                                                        },
                                                        "slug": "aedes_aegypti"
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "rank": "genus",
                                                    "name": "Culex",
                                                    "children": [
                                                      {
                                                        "rank": "species_complex",
                                                        "name": "Culex pipiens complex",
                                                        "children": [
                                                          {
                                                            "rank": "species",
                                                            "name": "Culex pipiens",
                                                            "children": [],
                                                            "common": "Northern house mosquito",
                                                            "kingdom": "Animalia",
                                                            "trait_values": {
                                                              "body_covering": "chitin",
                                                              "coloration": "brown",
                                                              "markings": "none",
                                                              "countershading": "no",
                                                              "body_length_cm": "0.5",
                                                              "posture": "hexapod",
                                                              "symmetry": "bilateral",
                                                              "body_regions": "head-thorax-abdomen",
                                                              "segmentation": "segmented",
                                                              "skeleton_position": "external",
                                                              "backbone": "no",
                                                              "eyes": "compound eyes",
                                                              "eye_position": "lateral",
                                                              "pinnae": "absent",
                                                              "vibrissae": "absent",
                                                              "antennae": "one pair",
                                                              "mouth": "piercing proboscis",
                                                              "dentition": "none",
                                                              "cranial_appendages": "none",
                                                              "limb_count": "6",
                                                              "appendages": "jointed legs",
                                                              "claw_type": "tarsal claws",
                                                              "wings": "one pair",
                                                              "locomotion": "fly",
                                                              "tail": "absent",
                                                              "tail_form": "absent",
                                                              "reproduction": "lays eggs",
                                                              "mammary_glands": "absent",
                                                              "metamorphosis": "complete",
                                                              "diet": "blood-nectar",
                                                              "habitat": "aerial"
                                                            },
                                                            "slug": "culex_pipiens"
                                                          },
                                                          {
                                                            "rank": "species",
                                                            "name": "Culex quinquefasciatus",
                                                            "children": [],
                                                            "common": "Southern house mosquito",
                                                            "kingdom": "Animalia",
                                                            "trait_values": {
                                                              "body_covering": "chitin",
                                                              "coloration": "brown",
                                                              "markings": "none",
                                                              "countershading": "no",
                                                              "body_length_cm": "0.5",
                                                              "posture": "hexapod",
                                                              "symmetry": "bilateral",
                                                              "body_regions": "head-thorax-abdomen",
                                                              "segmentation": "segmented",
                                                              "skeleton_position": "external",
                                                              "backbone": "no",
                                                              "eyes": "compound eyes",
                                                              "eye_position": "lateral",
                                                              "pinnae": "absent",
                                                              "vibrissae": "absent",
                                                              "antennae": "one pair",
                                                              "mouth": "piercing proboscis",
                                                              "dentition": "none",
                                                              "cranial_appendages": "none",
                                                              "limb_count": "6",
                                                              "appendages": "jointed legs",
                                                              "claw_type": "tarsal claws",
                                                              "wings": "one pair",
                                                              "locomotion": "fly",
                                                              "tail": "absent",
                                                              "tail_form": "absent",
                                                              "reproduction": "lays eggs",
                                                              "mammary_glands": "absent",
                                                              "metamorphosis": "complete",
                                                              "diet": "blood-nectar",
                                                              "habitat": "aerial"
                                                            },
                                                            "slug": "culex_quinquefasciatus"
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "rank": "suborder",
                                        "name": "Brachycera",
                                        "children": [
                                          {
                                            "rank": "family",
                                            "name": "Drosophilidae",
                                            "children": [
                                              {
                                                "rank": "genus",
                                                "name": "Drosophila",
                                                "children": [
                                                  {
                                                    "rank": "species",
                                                    "name": "Drosophila melanogaster",
                                                    "children": [],
                                                    "common": "Common fruit fly",
                                                    "kingdom": "Animalia",
                                                    "trait_values": {
                                                      "body_covering": "chitin",
                                                      "coloration": "tan",
                                                      "markings": "none",
                                                      "countershading": "no",
                                                      "body_length_cm": "0.3",
                                                      "posture": "hexapod",
                                                      "symmetry": "bilateral",
                                                      "body_regions": "head-thorax-abdomen",
                                                      "segmentation": "segmented",
                                                      "skeleton_position": "external",
                                                      "backbone": "no",
                                                      "eyes": "compound eyes",
                                                      "eye_position": "lateral",
                                                      "pinnae": "absent",
                                                      "vibrissae": "absent",
                                                      "antennae": "one pair",
                                                      "mouth": "sponging mouthparts",
                                                      "dentition": "none",
                                                      "cranial_appendages": "none",
                                                      "limb_count": "6",
                                                      "appendages": "jointed legs",
                                                      "claw_type": "tarsal claws",
                                                      "wings": "one pair",
                                                      "locomotion": "fly",
                                                      "tail": "absent",
                                                      "tail_form": "absent",
                                                      "reproduction": "lays eggs",
                                                      "mammary_glands": "absent",
                                                      "metamorphosis": "complete",
                                                      "diet": "fruit-yeast",
                                                      "habitat": "aerial"
                                                    },
                                                    "slug": "drosophila_melanogaster"
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            "common": "Animals",
            "traits": [
              "Multicellular, no cell walls",
              "Heterotrophic",
              "Develops from a blastula"
            ]
          },
          {
            "rank": "kingdom",
            "name": "Plantae",
            "children": [
              {
                "rank": "phylum",
                "name": "Tracheophyta",
                "children": [
                  {
                    "rank": "subphylum",
                    "name": "Spermatophytina",
                    "children": [
                      {
                        "rank": "class",
                        "name": "Liliopsida",
                        "children": [
                          {
                            "rank": "subclass",
                            "name": "Commelinidae",
                            "children": [
                              {
                                "rank": "order",
                                "name": "Poales",
                                "children": [
                                  {
                                    "rank": "family",
                                    "name": "Poaceae",
                                    "children": [
                                      {
                                        "rank": "subfamily",
                                        "name": "Pooideae",
                                        "children": [
                                          {
                                            "rank": "tribe",
                                            "name": "Triticeae",
                                            "children": [
                                              {
                                                "rank": "genus",
                                                "name": "Triticum",
                                                "children": [
                                                  {
                                                    "rank": "species",
                                                    "name": "Triticum aestivum",
                                                    "children": [],
                                                    "common": "Bread wheat",
                                                    "kingdom": "Plantae",
                                                    "trait_values": {
                                                      "growth_form": "grass",
                                                      "lifespan": "annual",
                                                      "plant_height_cm": "100",
                                                      "leaf_arrangement": "alternate",
                                                      "leaf_complexity": "simple",
                                                      "leaf_shape": "strap",
                                                      "leaf_venation": "parallel",
                                                      "leaf_margin": "entire",
                                                      "leaf_apex": "acuminate",
                                                      "leaf_attachment": "sheathing",
                                                      "pubescence": "glabrous",
                                                      "stem_type": "culm",
                                                      "stem_surface": "smooth",
                                                      "wood": "no",
                                                      "tendrils": "absent",
                                                      "root_system": "fibrous",
                                                      "flower_symmetry": "reduced",
                                                      "perianth": "reduced",
                                                      "petal_fusion": "reduced",
                                                      "flower_parts": "3",
                                                      "flower_color": "green",
                                                      "flower_size": "minute",
                                                      "inflorescence": "spike",
                                                      "pollination": "wind",
                                                      "fruit_type": "caryopsis",
                                                      "fruit_dehiscence": "indehiscent",
                                                      "fruit_color": "tan",
                                                      "seed_count": "one",
                                                      "seed_habit": "enclosed",
                                                      "cotyledons": "1",
                                                      "economic_use": "cereal"
                                                    },
                                                    "slug": "triticum_aestivum"
                                                  }
                                                ]
                                              },
                                              {
                                                "rank": "genus",
                                                "name": "Hordeum",
                                                "children": [
                                                  {
                                                    "rank": "species",
                                                    "name": "Hordeum vulgare",
                                                    "children": [],
                                                    "common": "Barley",
                                                    "kingdom": "Plantae",
                                                    "trait_values": {
                                                      "growth_form": "grass",
                                                      "lifespan": "annual",
                                                      "plant_height_cm": "90",
                                                      "leaf_arrangement": "alternate",
                                                      "leaf_complexity": "simple",
                                                      "leaf_shape": "strap",
                                                      "leaf_venation": "parallel",
                                                      "leaf_margin": "entire",
                                                      "leaf_apex": "acuminate",
                                                      "leaf_attachment": "sheathing",
                                                      "pubescence": "glabrous",
                                                      "stem_type": "culm",
                                                      "stem_surface": "smooth",
                                                      "wood": "no",
                                                      "tendrils": "absent",
                                                      "root_system": "fibrous",
                                                      "flower_symmetry": "reduced",
                                                      "perianth": "reduced",
                                                      "petal_fusion": "reduced",
                                                      "flower_parts": "3",
                                                      "flower_color": "green",
                                                      "flower_size": "minute",
                                                      "inflorescence": "spike",
                                                      "pollination": "wind",
                                                      "fruit_type": "caryopsis",
                                                      "fruit_dehiscence": "indehiscent",
                                                      "fruit_color": "tan",
                                                      "seed_count": "one",
                                                      "seed_habit": "enclosed",
                                                      "cotyledons": "1",
                                                      "economic_use": "cereal"
                                                    },
                                                    "slug": "hordeum_vulgare"
                                                  }
                                                ]
                                              },
                                              {
                                                "rank": "genus",
                                                "name": "Secale",
                                                "children": [
                                                  {
                                                    "rank": "species",
                                                    "name": "Secale cereale",
                                                    "children": [],
                                                    "common": "Rye",
                                                    "kingdom": "Plantae",
                                                    "trait_values": {
                                                      "growth_form": "grass",
                                                      "lifespan": "annual",
                                                      "plant_height_cm": "150",
                                                      "leaf_arrangement": "alternate",
                                                      "leaf_complexity": "simple",
                                                      "leaf_shape": "strap",
                                                      "leaf_venation": "parallel",
                                                      "leaf_margin": "entire",
                                                      "leaf_apex": "acuminate",
                                                      "leaf_attachment": "sheathing",
                                                      "pubescence": "glabrous",
                                                      "stem_type": "culm",
                                                      "stem_surface": "smooth",
                                                      "wood": "no",
                                                      "tendrils": "absent",
                                                      "root_system": "fibrous",
                                                      "flower_symmetry": "reduced",
                                                      "perianth": "reduced",
                                                      "petal_fusion": "reduced",
                                                      "flower_parts": "3",
                                                      "flower_color": "green",
                                                      "flower_size": "minute",
                                                      "inflorescence": "spike",
                                                      "pollination": "wind",
                                                      "fruit_type": "caryopsis",
                                                      "fruit_dehiscence": "indehiscent",
                                                      "fruit_color": "tan",
                                                      "seed_count": "one",
                                                      "seed_habit": "enclosed",
                                                      "cotyledons": "1",
                                                      "economic_use": "cereal"
                                                    },
                                                    "slug": "secale_cereale"
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "rank": "subfamily",
                                        "name": "Oryzoideae",
                                        "children": [
                                          {
                                            "rank": "genus",
                                            "name": "Oryza",
                                            "children": [
                                              {
                                                "rank": "species",
                                                "name": "Oryza sativa",
                                                "children": [],
                                                "common": "Asian rice",
                                                "kingdom": "Plantae",
                                                "trait_values": {
                                                  "growth_form": "grass",
                                                  "lifespan": "annual",
                                                  "plant_height_cm": "120",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_complexity": "simple",
                                                  "leaf_shape": "strap",
                                                  "leaf_venation": "parallel",
                                                  "leaf_margin": "entire",
                                                  "leaf_apex": "acuminate",
                                                  "leaf_attachment": "sheathing",
                                                  "pubescence": "glabrous",
                                                  "stem_type": "culm",
                                                  "stem_surface": "smooth",
                                                  "wood": "no",
                                                  "tendrils": "absent",
                                                  "root_system": "fibrous",
                                                  "flower_symmetry": "reduced",
                                                  "perianth": "reduced",
                                                  "petal_fusion": "reduced",
                                                  "flower_parts": "3",
                                                  "flower_color": "green",
                                                  "flower_size": "minute",
                                                  "inflorescence": "panicle",
                                                  "pollination": "wind",
                                                  "fruit_type": "caryopsis",
                                                  "fruit_dehiscence": "indehiscent",
                                                  "fruit_color": "tan",
                                                  "seed_count": "one",
                                                  "seed_habit": "enclosed",
                                                  "cotyledons": "1",
                                                  "economic_use": "cereal"
                                                },
                                                "slug": "oryza_sativa"
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "rank": "subfamily",
                                        "name": "Panicoideae",
                                        "children": [
                                          {
                                            "rank": "genus",
                                            "name": "Zea",
                                            "children": [
                                              {
                                                "rank": "species",
                                                "name": "Zea mays",
                                                "children": [],
                                                "common": "Maize",
                                                "kingdom": "Plantae",
                                                "trait_values": {
                                                  "growth_form": "grass",
                                                  "lifespan": "annual",
                                                  "plant_height_cm": "250",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_complexity": "simple",
                                                  "leaf_shape": "strap",
                                                  "leaf_venation": "parallel",
                                                  "leaf_margin": "entire",
                                                  "leaf_apex": "acuminate",
                                                  "leaf_attachment": "sheathing",
                                                  "pubescence": "glabrous",
                                                  "stem_type": "culm",
                                                  "stem_surface": "smooth",
                                                  "wood": "no",
                                                  "tendrils": "absent",
                                                  "root_system": "fibrous",
                                                  "flower_symmetry": "reduced",
                                                  "perianth": "reduced",
                                                  "petal_fusion": "reduced",
                                                  "flower_parts": "3",
                                                  "flower_color": "green",
                                                  "flower_size": "minute",
                                                  "inflorescence": "panicle",
                                                  "pollination": "wind",
                                                  "fruit_type": "caryopsis",
                                                  "fruit_dehiscence": "indehiscent",
                                                  "fruit_color": "yellow",
                                                  "seed_count": "many",
                                                  "seed_habit": "enclosed",
                                                  "cotyledons": "1",
                                                  "economic_use": "cereal"
                                                },
                                                "slug": "zea_mays"
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "rank": "subfamily",
                                        "name": "Bambusoideae",
                                        "children": [
                                          {
                                            "rank": "genus",
                                            "name": "Bambusa",
                                            "children": [
                                              {
                                                "rank": "species",
                                                "name": "Bambusa vulgaris",
                                                "children": [],
                                                "common": "Common bamboo",
                                                "kingdom": "Plantae",
                                                "trait_values": {
                                                  "growth_form": "woody grass",
                                                  "lifespan": "perennial",
                                                  "plant_height_cm": "2000",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_complexity": "simple",
                                                  "leaf_shape": "broad",
                                                  "leaf_venation": "parallel",
                                                  "leaf_margin": "entire",
                                                  "leaf_apex": "acuminate",
                                                  "leaf_attachment": "sheathing",
                                                  "pubescence": "glabrous",
                                                  "stem_type": "culm",
                                                  "stem_surface": "woody",
                                                  "wood": "yes",
                                                  "tendrils": "absent",
                                                  "root_system": "fibrous",
                                                  "flower_symmetry": "reduced",
                                                  "perianth": "reduced",
                                                  "petal_fusion": "reduced",
                                                  "flower_parts": "3",
                                                  "flower_color": "green",
                                                  "flower_size": "minute",
                                                  "inflorescence": "panicle",
                                                  "pollination": "wind",
                                                  "fruit_type": "caryopsis",
                                                  "fruit_dehiscence": "indehiscent",
                                                  "fruit_color": "tan",
                                                  "seed_count": "many",
                                                  "seed_habit": "enclosed",
                                                  "cotyledons": "1",
                                                  "economic_use": "timber"
                                                },
                                                "slug": "bambusa_vulgaris"
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "rank": "order",
                                "name": "Arecales",
                                "children": [
                                  {
                                    "rank": "family",
                                    "name": "Arecaceae",
                                    "children": [
                                      {
                                        "rank": "subfamily",
                                        "name": "Arecoideae",
                                        "children": [
                                          {
                                            "rank": "genus",
                                            "name": "Cocos",
                                            "children": [
                                              {
                                                "rank": "species",
                                                "name": "Cocos nucifera",
                                                "children": [],
                                                "common": "Coconut palm",
                                                "kingdom": "Plantae",
                                                "trait_values": {
                                                  "growth_form": "tree",
                                                  "lifespan": "perennial",
                                                  "plant_height_cm": "3000",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_complexity": "compound",
                                                  "leaf_shape": "frond",
                                                  "leaf_venation": "parallel",
                                                  "leaf_margin": "entire",
                                                  "leaf_apex": "acute",
                                                  "leaf_attachment": "sheathing",
                                                  "pubescence": "glabrous",
                                                  "stem_type": "woody",
                                                  "stem_surface": "ringed",
                                                  "wood": "no",
                                                  "tendrils": "absent",
                                                  "root_system": "fibrous",
                                                  "flower_symmetry": "radial",
                                                  "perianth": "tepals",
                                                  "petal_fusion": "free",
                                                  "flower_parts": "3",
                                                  "flower_color": "cream",
                                                  "flower_size": "small",
                                                  "inflorescence": "panicle",
                                                  "pollination": "insect",
                                                  "fruit_type": "drupe",
                                                  "fruit_dehiscence": "indehiscent",
                                                  "fruit_color": "brown",
                                                  "seed_count": "one",
                                                  "seed_habit": "enclosed",
                                                  "cotyledons": "1",
                                                  "economic_use": "fruit"
                                                },
                                                "slug": "cocos_nucifera"
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "rank": "class",
                        "name": "Magnoliopsida",
                        "children": [
                          {
                            "rank": "subclass",
                            "name": "Rosidae",
                            "children": [
                              {
                                "rank": "order",
                                "name": "Fabales",
                                "children": [
                                  {
                                    "rank": "family",
                                    "name": "Fabaceae",
                                    "children": [
                                      {
                                        "rank": "subfamily",
                                        "name": "Faboideae",
                                        "children": [
                                          {
                                            "rank": "genus",
                                            "name": "Pisum",
                                            "children": [
                                              {
                                                "rank": "species",
                                                "name": "Pisum sativum",
                                                "children": [],
                                                "common": "Garden pea",
                                                "kingdom": "Plantae",
                                                "trait_values": {
                                                  "growth_form": "vine",
                                                  "lifespan": "annual",
                                                  "plant_height_cm": "100",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_complexity": "compound",
                                                  "leaf_shape": "compound",
                                                  "leaf_venation": "net",
                                                  "leaf_margin": "entire",
                                                  "leaf_apex": "obtuse",
                                                  "leaf_attachment": "petiolate",
                                                  "pubescence": "glabrous",
                                                  "stem_type": "herbaceous",
                                                  "stem_surface": "smooth",
                                                  "wood": "no",
                                                  "tendrils": "present",
                                                  "root_system": "taproot",
                                                  "flower_symmetry": "bilateral",
                                                  "perianth": "sepals & petals",
                                                  "petal_fusion": "free",
                                                  "flower_parts": "4-5",
                                                  "flower_color": "white",
                                                  "flower_size": "medium",
                                                  "inflorescence": "solitary",
                                                  "pollination": "self",
                                                  "fruit_type": "pod",
                                                  "fruit_dehiscence": "dehiscent",
                                                  "fruit_color": "green",
                                                  "seed_count": "few",
                                                  "seed_habit": "enclosed",
                                                  "cotyledons": "2",
                                                  "economic_use": "vegetable"
                                                },
                                                "slug": "pisum_sativum"
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "rank": "subclass",
                            "name": "Asteridae",
                            "children": [
                              {
                                "rank": "order",
                                "name": "Solanales",
                                "children": [
                                  {
                                    "rank": "family",
                                    "name": "Solanaceae",
                                    "children": [
                                      {
                                        "rank": "subfamily",
                                        "name": "Solanoideae",
                                        "children": [
                                          {
                                            "rank": "genus",
                                            "name": "Solanum",
                                            "children": [
                                              {
                                                "rank": "species",
                                                "name": "Solanum lycopersicum",
                                                "children": [],
                                                "common": "Tomato",
                                                "kingdom": "Plantae",
                                                "trait_values": {
                                                  "growth_form": "herb",
                                                  "lifespan": "annual",
                                                  "plant_height_cm": "150",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_complexity": "compound",
                                                  "leaf_shape": "compound",
                                                  "leaf_venation": "net",
                                                  "leaf_margin": "serrate",
                                                  "leaf_apex": "acuminate",
                                                  "leaf_attachment": "petiolate",
                                                  "pubescence": "pubescent",
                                                  "stem_type": "herbaceous",
                                                  "stem_surface": "hairy",
                                                  "wood": "no",
                                                  "tendrils": "absent",
                                                  "root_system": "taproot",
                                                  "flower_symmetry": "radial",
                                                  "perianth": "sepals & petals",
                                                  "petal_fusion": "fused",
                                                  "flower_parts": "4-5",
                                                  "flower_color": "yellow",
                                                  "flower_size": "small",
                                                  "inflorescence": "solitary",
                                                  "pollination": "insect",
                                                  "fruit_type": "berry",
                                                  "fruit_dehiscence": "indehiscent",
                                                  "fruit_color": "red",
                                                  "seed_count": "many",
                                                  "seed_habit": "enclosed",
                                                  "cotyledons": "2",
                                                  "economic_use": "vegetable"
                                                },
                                                "slug": "solanum_lycopersicum"
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            "common": "Land plants",
            "traits": [
              "Cell walls of cellulose",
              "Photosynthetic (chlorophyll a & b)",
              "Alternation of generations"
            ]
          }
        ],
        "common": "Eukaryotes",
        "traits": [
          "Membrane-bound nucleus",
          "Organelles"
        ]
      }
    ]
  }
};

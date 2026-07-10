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
        "key": "limb_count",
        "label": "Limb count",
        "type": "numeric",
        "min": 4.0,
        "max": 6.0
      },
      {
        "key": "wings",
        "label": "Wings",
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
        "key": "body_regions",
        "label": "Body regions",
        "type": "categorical"
      },
      {
        "key": "symmetry",
        "label": "Symmetry",
        "type": "categorical"
      },
      {
        "key": "germ_layers",
        "label": "Germ layers",
        "type": "categorical"
      },
      {
        "key": "coelom",
        "label": "Coelom",
        "type": "categorical"
      },
      {
        "key": "eyes",
        "label": "Eyes",
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
        "key": "circulatory_system",
        "label": "Circulatory system",
        "type": "categorical"
      },
      {
        "key": "heart_chambers",
        "label": "Heart chambers",
        "type": "categorical"
      },
      {
        "key": "blood_pigment",
        "label": "Blood pigment",
        "type": "categorical"
      },
      {
        "key": "nervous_cord",
        "label": "Nervous cord",
        "type": "categorical"
      },
      {
        "key": "thermoregulation",
        "label": "Thermoregulation",
        "type": "categorical"
      },
      {
        "key": "reproduction",
        "label": "Reproduction",
        "type": "categorical"
      },
      {
        "key": "fertilization",
        "label": "Fertilization",
        "type": "categorical"
      },
      {
        "key": "parental_milk",
        "label": "Parental milk",
        "type": "categorical"
      },
      {
        "key": "respiration",
        "label": "Respiration",
        "type": "categorical"
      },
      {
        "key": "appendages",
        "label": "Appendages",
        "type": "categorical"
      },
      {
        "key": "locomotion",
        "label": "Locomotion",
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
      },
      {
        "key": "metamorphosis",
        "label": "Metamorphosis",
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
        "key": "markings",
        "label": "Markings",
        "type": "categorical"
      },
      {
        "key": "pinnae",
        "label": "Pinnae",
        "type": "categorical"
      },
      {
        "key": "tail",
        "label": "Tail",
        "type": "categorical"
      },
      {
        "key": "claw_type",
        "label": "Claw type",
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
        "key": "vascular_tissue",
        "label": "Vascular tissue",
        "type": "categorical"
      },
      {
        "key": "leaf_venation",
        "label": "Leaf venation",
        "type": "categorical"
      },
      {
        "key": "leaf_arrangement",
        "label": "Leaf arrangement",
        "type": "categorical"
      },
      {
        "key": "leaf_shape",
        "label": "Leaf shape",
        "type": "categorical"
      },
      {
        "key": "leaf_margin",
        "label": "Leaf margin",
        "type": "categorical"
      },
      {
        "key": "stem_type",
        "label": "Stem type",
        "type": "categorical"
      },
      {
        "key": "stem_bundles",
        "label": "Stem bundles",
        "type": "categorical"
      },
      {
        "key": "root_system",
        "label": "Root system",
        "type": "categorical"
      },
      {
        "key": "wood",
        "label": "Wood",
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
        "key": "seed_habit",
        "label": "Seed habit",
        "type": "categorical"
      },
      {
        "key": "gametophyte",
        "label": "Gametophyte",
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
        "key": "flower_parts",
        "label": "Flower parts",
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
        "key": "seed_count",
        "label": "Seed count",
        "type": "categorical"
      },
      {
        "key": "photosynthesis",
        "label": "Photosynthesis",
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
        "key": "economic_use",
        "label": "Economic use",
        "type": "categorical"
      },
      {
        "key": "flower_color",
        "label": "Flower color",
        "type": "categorical"
      },
      {
        "key": "fruit_color",
        "label": "Fruit color",
        "type": "categorical"
      },
      {
        "key": "pubescence",
        "label": "Pubescence",
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
                                                                      "limb_count": "4",
                                                                      "wings": "none",
                                                                      "skeleton_position": "internal",
                                                                      "backbone": "yes",
                                                                      "body_regions": "head-neck-trunk-tail",
                                                                      "symmetry": "bilateral",
                                                                      "germ_layers": "triploblastic",
                                                                      "coelom": "coelomate",
                                                                      "eyes": "two camera eyes",
                                                                      "antennae": "none",
                                                                      "mouth": "jaws with teeth",
                                                                      "dentition": "heterodont teeth",
                                                                      "circulatory_system": "closed",
                                                                      "heart_chambers": "four-chambered",
                                                                      "blood_pigment": "hemoglobin",
                                                                      "nervous_cord": "dorsal",
                                                                      "thermoregulation": "warm-blooded",
                                                                      "reproduction": "live birth",
                                                                      "fertilization": "internal",
                                                                      "parental_milk": "yes",
                                                                      "respiration": "lungs",
                                                                      "appendages": "pentadactyl limbs",
                                                                      "locomotion": "walk",
                                                                      "diet": "omnivore",
                                                                      "habitat": "terrestrial",
                                                                      "metamorphosis": "none",
                                                                      "body_length_cm": "170",
                                                                      "markings": "none",
                                                                      "pinnae": "present",
                                                                      "tail": "absent",
                                                                      "claw_type": "nails"
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
                                                                      "limb_count": "4",
                                                                      "wings": "none",
                                                                      "skeleton_position": "internal",
                                                                      "backbone": "yes",
                                                                      "body_regions": "head-neck-trunk-tail",
                                                                      "symmetry": "bilateral",
                                                                      "germ_layers": "triploblastic",
                                                                      "coelom": "coelomate",
                                                                      "eyes": "two camera eyes",
                                                                      "antennae": "none",
                                                                      "mouth": "jaws with teeth",
                                                                      "dentition": "heterodont teeth",
                                                                      "circulatory_system": "closed",
                                                                      "heart_chambers": "four-chambered",
                                                                      "blood_pigment": "hemoglobin",
                                                                      "nervous_cord": "dorsal",
                                                                      "thermoregulation": "warm-blooded",
                                                                      "reproduction": "live birth",
                                                                      "fertilization": "internal",
                                                                      "parental_milk": "yes",
                                                                      "respiration": "lungs",
                                                                      "appendages": "pentadactyl limbs",
                                                                      "locomotion": "walk",
                                                                      "diet": "omnivore",
                                                                      "habitat": "terrestrial",
                                                                      "metamorphosis": "none",
                                                                      "body_length_cm": "50",
                                                                      "markings": "none",
                                                                      "pinnae": "present",
                                                                      "tail": "present",
                                                                      "claw_type": "nails"
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
                                                                  "limb_count": "4",
                                                                  "wings": "none",
                                                                  "skeleton_position": "internal",
                                                                  "backbone": "yes",
                                                                  "body_regions": "head-neck-trunk-tail",
                                                                  "symmetry": "bilateral",
                                                                  "germ_layers": "triploblastic",
                                                                  "coelom": "coelomate",
                                                                  "eyes": "two camera eyes",
                                                                  "antennae": "none",
                                                                  "mouth": "jaws with teeth",
                                                                  "dentition": "ever-growing incisors",
                                                                  "circulatory_system": "closed",
                                                                  "heart_chambers": "four-chambered",
                                                                  "blood_pigment": "hemoglobin",
                                                                  "nervous_cord": "dorsal",
                                                                  "thermoregulation": "warm-blooded",
                                                                  "reproduction": "live birth",
                                                                  "fertilization": "internal",
                                                                  "parental_milk": "yes",
                                                                  "respiration": "lungs",
                                                                  "appendages": "pentadactyl limbs",
                                                                  "locomotion": "run",
                                                                  "diet": "herbivore",
                                                                  "habitat": "terrestrial",
                                                                  "metamorphosis": "none",
                                                                  "body_length_cm": "9",
                                                                  "markings": "none",
                                                                  "pinnae": "present",
                                                                  "tail": "present",
                                                                  "claw_type": "claws"
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
                                                                  "limb_count": "4",
                                                                  "wings": "none",
                                                                  "skeleton_position": "internal",
                                                                  "backbone": "yes",
                                                                  "body_regions": "head-neck-trunk-tail",
                                                                  "symmetry": "bilateral",
                                                                  "germ_layers": "triploblastic",
                                                                  "coelom": "coelomate",
                                                                  "eyes": "two camera eyes",
                                                                  "antennae": "none",
                                                                  "mouth": "jaws with teeth",
                                                                  "dentition": "ever-growing incisors",
                                                                  "circulatory_system": "closed",
                                                                  "heart_chambers": "four-chambered",
                                                                  "blood_pigment": "hemoglobin",
                                                                  "nervous_cord": "dorsal",
                                                                  "thermoregulation": "warm-blooded",
                                                                  "reproduction": "live birth",
                                                                  "fertilization": "internal",
                                                                  "parental_milk": "yes",
                                                                  "respiration": "lungs",
                                                                  "appendages": "pentadactyl limbs",
                                                                  "locomotion": "run",
                                                                  "diet": "omnivore",
                                                                  "habitat": "terrestrial",
                                                                  "metamorphosis": "none",
                                                                  "body_length_cm": "25",
                                                                  "markings": "none",
                                                                  "pinnae": "present",
                                                                  "tail": "present",
                                                                  "claw_type": "claws"
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
                                                              "limb_count": "4",
                                                              "wings": "none",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "symmetry": "bilateral",
                                                              "germ_layers": "triploblastic",
                                                              "coelom": "coelomate",
                                                              "eyes": "two camera eyes",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "circulatory_system": "closed",
                                                              "heart_chambers": "four-chambered",
                                                              "blood_pigment": "hemoglobin",
                                                              "nervous_cord": "dorsal",
                                                              "thermoregulation": "warm-blooded",
                                                              "reproduction": "live birth",
                                                              "fertilization": "internal",
                                                              "parental_milk": "yes",
                                                              "respiration": "lungs",
                                                              "appendages": "pentadactyl limbs",
                                                              "locomotion": "run",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial",
                                                              "metamorphosis": "none",
                                                              "body_length_cm": "46",
                                                              "markings": "none",
                                                              "pinnae": "present",
                                                              "tail": "present",
                                                              "claw_type": "retractable claws"
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
                                                              "limb_count": "4",
                                                              "wings": "none",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "symmetry": "bilateral",
                                                              "germ_layers": "triploblastic",
                                                              "coelom": "coelomate",
                                                              "eyes": "two camera eyes",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "circulatory_system": "closed",
                                                              "heart_chambers": "four-chambered",
                                                              "blood_pigment": "hemoglobin",
                                                              "nervous_cord": "dorsal",
                                                              "thermoregulation": "warm-blooded",
                                                              "reproduction": "live birth",
                                                              "fertilization": "internal",
                                                              "parental_milk": "yes",
                                                              "respiration": "lungs",
                                                              "appendages": "pentadactyl limbs",
                                                              "locomotion": "run",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial",
                                                              "metamorphosis": "none",
                                                              "body_length_cm": "200",
                                                              "markings": "none",
                                                              "pinnae": "present",
                                                              "tail": "present",
                                                              "claw_type": "retractable claws"
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
                                                              "limb_count": "4",
                                                              "wings": "none",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "symmetry": "bilateral",
                                                              "germ_layers": "triploblastic",
                                                              "coelom": "coelomate",
                                                              "eyes": "two camera eyes",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "circulatory_system": "closed",
                                                              "heart_chambers": "four-chambered",
                                                              "blood_pigment": "hemoglobin",
                                                              "nervous_cord": "dorsal",
                                                              "thermoregulation": "warm-blooded",
                                                              "reproduction": "live birth",
                                                              "fertilization": "internal",
                                                              "parental_milk": "yes",
                                                              "respiration": "lungs",
                                                              "appendages": "pentadactyl limbs",
                                                              "locomotion": "run",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial",
                                                              "metamorphosis": "none",
                                                              "body_length_cm": "250",
                                                              "markings": "stripes",
                                                              "pinnae": "present",
                                                              "tail": "present",
                                                              "claw_type": "retractable claws"
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
                                                              "limb_count": "4",
                                                              "wings": "none",
                                                              "skeleton_position": "internal",
                                                              "backbone": "yes",
                                                              "body_regions": "head-neck-trunk-tail",
                                                              "symmetry": "bilateral",
                                                              "germ_layers": "triploblastic",
                                                              "coelom": "coelomate",
                                                              "eyes": "two camera eyes",
                                                              "antennae": "none",
                                                              "mouth": "jaws with teeth",
                                                              "dentition": "carnassials",
                                                              "circulatory_system": "closed",
                                                              "heart_chambers": "four-chambered",
                                                              "blood_pigment": "hemoglobin",
                                                              "nervous_cord": "dorsal",
                                                              "thermoregulation": "warm-blooded",
                                                              "reproduction": "live birth",
                                                              "fertilization": "internal",
                                                              "parental_milk": "yes",
                                                              "respiration": "lungs",
                                                              "appendages": "pentadactyl limbs",
                                                              "locomotion": "run",
                                                              "diet": "carnivore",
                                                              "habitat": "terrestrial",
                                                              "metamorphosis": "none",
                                                              "body_length_cm": "60",
                                                              "markings": "none",
                                                              "pinnae": "present",
                                                              "tail": "present",
                                                              "claw_type": "non-retractable claws"
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
                                                          "limb_count": "6",
                                                          "wings": "one pair",
                                                          "skeleton_position": "external",
                                                          "backbone": "no",
                                                          "body_regions": "head-thorax-abdomen",
                                                          "symmetry": "bilateral",
                                                          "germ_layers": "triploblastic",
                                                          "coelom": "coelomate",
                                                          "eyes": "compound eyes",
                                                          "antennae": "one pair",
                                                          "mouth": "piercing proboscis",
                                                          "dentition": "none",
                                                          "circulatory_system": "open",
                                                          "heart_chambers": "dorsal tube heart",
                                                          "blood_pigment": "hemolymph",
                                                          "nervous_cord": "ventral",
                                                          "thermoregulation": "cold-blooded",
                                                          "reproduction": "lays eggs",
                                                          "fertilization": "internal",
                                                          "parental_milk": "no",
                                                          "respiration": "tracheae",
                                                          "appendages": "jointed legs",
                                                          "locomotion": "fly",
                                                          "diet": "blood-nectar",
                                                          "habitat": "aerial",
                                                          "metamorphosis": "complete",
                                                          "body_length_cm": "0.5",
                                                          "markings": "stripes",
                                                          "pinnae": "absent",
                                                          "tail": "absent",
                                                          "claw_type": "tarsal claws"
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
                                                              "limb_count": "6",
                                                              "wings": "one pair",
                                                              "skeleton_position": "external",
                                                              "backbone": "no",
                                                              "body_regions": "head-thorax-abdomen",
                                                              "symmetry": "bilateral",
                                                              "germ_layers": "triploblastic",
                                                              "coelom": "coelomate",
                                                              "eyes": "compound eyes",
                                                              "antennae": "one pair",
                                                              "mouth": "piercing proboscis",
                                                              "dentition": "none",
                                                              "circulatory_system": "open",
                                                              "heart_chambers": "dorsal tube heart",
                                                              "blood_pigment": "hemolymph",
                                                              "nervous_cord": "ventral",
                                                              "thermoregulation": "cold-blooded",
                                                              "reproduction": "lays eggs",
                                                              "fertilization": "internal",
                                                              "parental_milk": "no",
                                                              "respiration": "tracheae",
                                                              "appendages": "jointed legs",
                                                              "locomotion": "fly",
                                                              "diet": "blood-nectar",
                                                              "habitat": "aerial",
                                                              "metamorphosis": "complete",
                                                              "body_length_cm": "0.5",
                                                              "markings": "none",
                                                              "pinnae": "absent",
                                                              "tail": "absent",
                                                              "claw_type": "tarsal claws"
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
                                                              "limb_count": "6",
                                                              "wings": "one pair",
                                                              "skeleton_position": "external",
                                                              "backbone": "no",
                                                              "body_regions": "head-thorax-abdomen",
                                                              "symmetry": "bilateral",
                                                              "germ_layers": "triploblastic",
                                                              "coelom": "coelomate",
                                                              "eyes": "compound eyes",
                                                              "antennae": "one pair",
                                                              "mouth": "piercing proboscis",
                                                              "dentition": "none",
                                                              "circulatory_system": "open",
                                                              "heart_chambers": "dorsal tube heart",
                                                              "blood_pigment": "hemolymph",
                                                              "nervous_cord": "ventral",
                                                              "thermoregulation": "cold-blooded",
                                                              "reproduction": "lays eggs",
                                                              "fertilization": "internal",
                                                              "parental_milk": "no",
                                                              "respiration": "tracheae",
                                                              "appendages": "jointed legs",
                                                              "locomotion": "fly",
                                                              "diet": "blood-nectar",
                                                              "habitat": "aerial",
                                                              "metamorphosis": "complete",
                                                              "body_length_cm": "0.5",
                                                              "markings": "none",
                                                              "pinnae": "absent",
                                                              "tail": "absent",
                                                              "claw_type": "tarsal claws"
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
                                                      "limb_count": "6",
                                                      "wings": "one pair",
                                                      "skeleton_position": "external",
                                                      "backbone": "no",
                                                      "body_regions": "head-thorax-abdomen",
                                                      "symmetry": "bilateral",
                                                      "germ_layers": "triploblastic",
                                                      "coelom": "coelomate",
                                                      "eyes": "compound eyes",
                                                      "antennae": "one pair",
                                                      "mouth": "sponging mouthparts",
                                                      "dentition": "none",
                                                      "circulatory_system": "open",
                                                      "heart_chambers": "dorsal tube heart",
                                                      "blood_pigment": "hemolymph",
                                                      "nervous_cord": "ventral",
                                                      "thermoregulation": "cold-blooded",
                                                      "reproduction": "lays eggs",
                                                      "fertilization": "internal",
                                                      "parental_milk": "no",
                                                      "respiration": "tracheae",
                                                      "appendages": "jointed legs",
                                                      "locomotion": "fly",
                                                      "diet": "fruit-yeast",
                                                      "habitat": "aerial",
                                                      "metamorphosis": "complete",
                                                      "body_length_cm": "0.3",
                                                      "markings": "none",
                                                      "pinnae": "absent",
                                                      "tail": "absent",
                                                      "claw_type": "tarsal claws"
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
                                                      "vascular_tissue": "xylem & phloem",
                                                      "leaf_venation": "parallel",
                                                      "leaf_arrangement": "alternate",
                                                      "leaf_shape": "strap",
                                                      "leaf_margin": "entire",
                                                      "stem_type": "culm",
                                                      "stem_bundles": "scattered",
                                                      "root_system": "fibrous",
                                                      "wood": "no",
                                                      "cotyledons": "1",
                                                      "seed_habit": "enclosed",
                                                      "gametophyte": "reduced",
                                                      "flower_symmetry": "reduced",
                                                      "perianth": "reduced",
                                                      "flower_parts": "3",
                                                      "inflorescence": "spike",
                                                      "pollination": "wind",
                                                      "fruit_type": "caryopsis",
                                                      "seed_count": "one",
                                                      "photosynthesis": "C3",
                                                      "plant_height_cm": "100",
                                                      "economic_use": "cereal",
                                                      "flower_color": "green",
                                                      "fruit_color": "tan",
                                                      "pubescence": "glabrous"
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
                                                      "vascular_tissue": "xylem & phloem",
                                                      "leaf_venation": "parallel",
                                                      "leaf_arrangement": "alternate",
                                                      "leaf_shape": "strap",
                                                      "leaf_margin": "entire",
                                                      "stem_type": "culm",
                                                      "stem_bundles": "scattered",
                                                      "root_system": "fibrous",
                                                      "wood": "no",
                                                      "cotyledons": "1",
                                                      "seed_habit": "enclosed",
                                                      "gametophyte": "reduced",
                                                      "flower_symmetry": "reduced",
                                                      "perianth": "reduced",
                                                      "flower_parts": "3",
                                                      "inflorescence": "spike",
                                                      "pollination": "wind",
                                                      "fruit_type": "caryopsis",
                                                      "seed_count": "one",
                                                      "photosynthesis": "C3",
                                                      "plant_height_cm": "90",
                                                      "economic_use": "cereal",
                                                      "flower_color": "green",
                                                      "fruit_color": "tan",
                                                      "pubescence": "glabrous"
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
                                                      "vascular_tissue": "xylem & phloem",
                                                      "leaf_venation": "parallel",
                                                      "leaf_arrangement": "alternate",
                                                      "leaf_shape": "strap",
                                                      "leaf_margin": "entire",
                                                      "stem_type": "culm",
                                                      "stem_bundles": "scattered",
                                                      "root_system": "fibrous",
                                                      "wood": "no",
                                                      "cotyledons": "1",
                                                      "seed_habit": "enclosed",
                                                      "gametophyte": "reduced",
                                                      "flower_symmetry": "reduced",
                                                      "perianth": "reduced",
                                                      "flower_parts": "3",
                                                      "inflorescence": "spike",
                                                      "pollination": "wind",
                                                      "fruit_type": "caryopsis",
                                                      "seed_count": "one",
                                                      "photosynthesis": "C3",
                                                      "plant_height_cm": "150",
                                                      "economic_use": "cereal",
                                                      "flower_color": "green",
                                                      "fruit_color": "tan",
                                                      "pubescence": "glabrous"
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
                                                  "vascular_tissue": "xylem & phloem",
                                                  "leaf_venation": "parallel",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_shape": "strap",
                                                  "leaf_margin": "entire",
                                                  "stem_type": "culm",
                                                  "stem_bundles": "scattered",
                                                  "root_system": "fibrous",
                                                  "wood": "no",
                                                  "cotyledons": "1",
                                                  "seed_habit": "enclosed",
                                                  "gametophyte": "reduced",
                                                  "flower_symmetry": "reduced",
                                                  "perianth": "reduced",
                                                  "flower_parts": "3",
                                                  "inflorescence": "panicle",
                                                  "pollination": "wind",
                                                  "fruit_type": "caryopsis",
                                                  "seed_count": "one",
                                                  "photosynthesis": "C3",
                                                  "plant_height_cm": "120",
                                                  "economic_use": "cereal",
                                                  "flower_color": "green",
                                                  "fruit_color": "tan",
                                                  "pubescence": "glabrous"
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
                                                  "vascular_tissue": "xylem & phloem",
                                                  "leaf_venation": "parallel",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_shape": "strap",
                                                  "leaf_margin": "entire",
                                                  "stem_type": "culm",
                                                  "stem_bundles": "scattered",
                                                  "root_system": "fibrous",
                                                  "wood": "no",
                                                  "cotyledons": "1",
                                                  "seed_habit": "enclosed",
                                                  "gametophyte": "reduced",
                                                  "flower_symmetry": "reduced",
                                                  "perianth": "reduced",
                                                  "flower_parts": "3",
                                                  "inflorescence": "panicle",
                                                  "pollination": "wind",
                                                  "fruit_type": "caryopsis",
                                                  "seed_count": "many",
                                                  "photosynthesis": "C4",
                                                  "plant_height_cm": "250",
                                                  "economic_use": "cereal",
                                                  "flower_color": "green",
                                                  "fruit_color": "yellow",
                                                  "pubescence": "glabrous"
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
                                                  "vascular_tissue": "xylem & phloem",
                                                  "leaf_venation": "parallel",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_shape": "broad",
                                                  "leaf_margin": "entire",
                                                  "stem_type": "culm",
                                                  "stem_bundles": "scattered",
                                                  "root_system": "fibrous",
                                                  "wood": "yes",
                                                  "cotyledons": "1",
                                                  "seed_habit": "enclosed",
                                                  "gametophyte": "reduced",
                                                  "flower_symmetry": "reduced",
                                                  "perianth": "reduced",
                                                  "flower_parts": "3",
                                                  "inflorescence": "panicle",
                                                  "pollination": "wind",
                                                  "fruit_type": "caryopsis",
                                                  "seed_count": "many",
                                                  "photosynthesis": "C3",
                                                  "plant_height_cm": "2000",
                                                  "economic_use": "timber",
                                                  "flower_color": "green",
                                                  "fruit_color": "tan",
                                                  "pubescence": "glabrous"
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
                                                  "vascular_tissue": "xylem & phloem",
                                                  "leaf_venation": "parallel",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_shape": "frond",
                                                  "leaf_margin": "entire",
                                                  "stem_type": "woody",
                                                  "stem_bundles": "scattered",
                                                  "root_system": "fibrous",
                                                  "wood": "no",
                                                  "cotyledons": "1",
                                                  "seed_habit": "enclosed",
                                                  "gametophyte": "reduced",
                                                  "flower_symmetry": "radial",
                                                  "perianth": "tepals",
                                                  "flower_parts": "3",
                                                  "inflorescence": "panicle",
                                                  "pollination": "insect",
                                                  "fruit_type": "drupe",
                                                  "seed_count": "one",
                                                  "photosynthesis": "C3",
                                                  "plant_height_cm": "3000",
                                                  "economic_use": "fruit",
                                                  "flower_color": "cream",
                                                  "fruit_color": "brown",
                                                  "pubescence": "glabrous"
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
                                                  "vascular_tissue": "xylem & phloem",
                                                  "leaf_venation": "net",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_shape": "compound",
                                                  "leaf_margin": "entire",
                                                  "stem_type": "herbaceous",
                                                  "stem_bundles": "ring",
                                                  "root_system": "taproot",
                                                  "wood": "no",
                                                  "cotyledons": "2",
                                                  "seed_habit": "enclosed",
                                                  "gametophyte": "reduced",
                                                  "flower_symmetry": "bilateral",
                                                  "perianth": "sepals & petals",
                                                  "flower_parts": "4-5",
                                                  "inflorescence": "solitary",
                                                  "pollination": "self",
                                                  "fruit_type": "pod",
                                                  "seed_count": "few",
                                                  "photosynthesis": "C3",
                                                  "plant_height_cm": "100",
                                                  "economic_use": "vegetable",
                                                  "flower_color": "white",
                                                  "fruit_color": "green",
                                                  "pubescence": "glabrous"
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
                                                  "vascular_tissue": "xylem & phloem",
                                                  "leaf_venation": "net",
                                                  "leaf_arrangement": "alternate",
                                                  "leaf_shape": "compound",
                                                  "leaf_margin": "serrate",
                                                  "stem_type": "herbaceous",
                                                  "stem_bundles": "ring",
                                                  "root_system": "taproot",
                                                  "wood": "no",
                                                  "cotyledons": "2",
                                                  "seed_habit": "enclosed",
                                                  "gametophyte": "reduced",
                                                  "flower_symmetry": "radial",
                                                  "perianth": "sepals & petals",
                                                  "flower_parts": "4-5",
                                                  "inflorescence": "solitary",
                                                  "pollination": "insect",
                                                  "fruit_type": "berry",
                                                  "seed_count": "many",
                                                  "photosynthesis": "C3",
                                                  "plant_height_cm": "150",
                                                  "economic_use": "vegetable",
                                                  "flower_color": "yellow",
                                                  "fruit_color": "red",
                                                  "pubescence": "pubescent"
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

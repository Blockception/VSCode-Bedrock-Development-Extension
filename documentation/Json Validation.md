# Json Validation

Json validation is applied to a specific filename or when it is placed in the appropriate folder. If * is present in the json file pattern, then it means that any amount of random character can be placed there. Version specific json validation is automatically applied.
All elements should have received a description and title. If none are present. Then that version hasn't been supported yet. You can request one as an issue.
If a json validation is missing, then also post an issue. And one will be made in the future unless a good reason why not has been given.

- [Json Validation](#json-validation)
  - [General](#general)
  - [World](#world)
  - [Resource packs](#resource-packs)
  - [Behaviour packs](#behaviour-packs)

## General

|Component  |Json file pattern  |
|-----------|-------------------|
|Manifest   |manifest.json |
|Languages   |languages.json |
|Language_names   |language_names.json |

## World

|Component  |Json file pattern  |
|-----------|-------------------|
|World_behavior_packs   |world_behavior_packs.json |
|World_resource_packs   |world_resource_packs.json  |

## Resource packs

|Component  |Json file pattern  |
|-----------|-------------------|
|Animation controllers   |animation_controllers/*.json |
|Animations   |animations/*.animation.json  |
|Attachables   |attachables/*.json  |
|Biomes client   |biomes_client.json  |
|Entity   |entity/*entity.json  |
|Models   |'*.geo.json' or '*.geometry.json' |
|Music definitions   |music_definitions.json  |
|Particles   |particles/*.json or .particle.json |
|Render controllers   |render_controllers/*.json  |
|Sound definitions   |sound_definitions.json  |
|Sounds   |sounds.json  |
|Terrain texture   |terrain_texture.json  |

## Behaviour packs

|Component  |Json file pattern  |
|-----------|-------------------|
|Animation controllers   |animation_controllers/*.json |
|Entity behaviours |entities/*.json|
|Item behaviours |items/*.json|
|Loot tables |loot_tables/*.json|
|Spawn rules |spawn_rules/*.json|
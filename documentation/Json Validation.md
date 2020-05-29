# Json Validation

Json validation is only applied to the specific filename or when it is placed in the appropriate folder. If * is present in the json file pattern then it mean that any amount of random character can be placed there. For version specific json validation is automaticly applied.
All elements should have received a description, and title. if none are present. then that version hasn't been supported yet. You can request one as an issue.
If a json validation is missing. Then also post an issue. and one will be made in the future, unless a good reason why not has been given.

- [Json Validation](#json-validation)
  - [General](#general)
  - [World](#world)
  - [Resource packs](#resource-packs)
  - [Behaviour packs](#behaviour-packs)
- [Json Validation](#json-validation-1)
  - [General](#general-1)
  - [World](#world-1)
  - [Resource packs](#resource-packs-1)
  - [Behaviour packs](#behaviour-packs-1)

## General

|Component  |Json file pattern  |
|-----------|-------------------|
|manifest   |manifest.json |

## World

|Component  |Json file pattern  |
|-----------|-------------------|
|world_behavior_packs   |world_behavior_packs.json |
|world_resource_packs   |world_resource_packs.json  |

## Resource packs

|Component  |Json file pattern  |
|-----------|-------------------|
|animation_controllers   |animation_controllers/*.json |
|animations   |animations/*.animation.json  |
|attachables   |attachables/*.json  |
|biomes_client   |biomes_client.json  |
|entity   |entity/*entity.json  |
|models   |'*.geo.json' or '*.geometry.json' |
|particles   |particles/*.json  |
|sound definitions   |sound_definitions.json  |

## Behaviour packs

|Component  |Json file pattern  |
|-----------|-------------------|
|animation_controllers   |animation_controllers/*.json |
|entity behaviour |entities/*.json|

# Json Validation

- [Json Validation](#json-validation)
  - [General](#general)
  - [World](#world)
  - [Resource packs](#resource-packs)
  - [Behaviour packs](#behaviour-packs)
- [Json Validation](#json-validation-1)
  - [General](#general-1)
  - [World](#world-1)
  - [Resource packs](#resource-packs-1)
  - [Behaviour packs](#behaviour-packs-1)

## General

|Component  |Json file pattern  |
|-----------|-------------------|
|manifest   |manifest.json |
|languages   |languages.json |
|language_names   |language_names.json |

## World

|Component  |Json file pattern  |
|-----------|-------------------|
|world_behavior_packs   |world_behavior_packs.json |
|world_resource_packs   |world_resource_packs.json  |

## Resource packs

|Component  |Json file pattern  |
|-----------|-------------------|
|animation_controllers   |animation_controllers/*.json |
|animations   |animations/*.animation.json  |
|biomes_client   |biomes_client.json  |
|entity   |entity/*entity.json  |
|models   |*.geo.json  |
|particles   |particles/*.json  |
|render_controllers   |render_controllers/*.json  |
|sound definitions   |sound_definitions.json  |
|terrain texture   |terrain_texture.json  |
|music definitions   |music_definitions.json  |

## Behaviour packs

|Component  |Json file pattern  |
|-----------|-------------------|
|entity behaviour|entities/*.json|
|animation_controllers   |animation_controllers/*.json |
|items   |items/*.json |
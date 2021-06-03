# Json Validation

Json validation is applied to a specific filename or when it is placed in the appropriate folder. If \* is present in the When is it applied, then it means that any amount of
random character can be placed there. Version specific json validation is automatically applied. All elements should have received a description and title. If none are present.
Then that version hasn't been supported yet. You can request one as an issue. If a json validation is missing, then post an issue. And one will be made in the future unless a good
reason why not has been given.

- [Json Validation](#json-validation)
  - [General](#general)
  - [World](#world)
  - [Resource packs](#resource-packs)
  - [Behavior packs](#behavior-packs)
  - [Skinpacks](#skinpacks)

## General

| Schema         | When is it applied                          |
| -------------- | ------------------------------------------- |
| Manifest       | If the file is named: `manifest.json`       |
| Languages      | If the file is named: `languages.json`      |
| Language_names | If the file is named: `language_names.json` |

---

## World

| Schema               | When is it applied                                |
| -------------------- | ------------------------------------------------- |
| World_behavior_packs | If the file is named: `world_behavior_packs.json` |
| World_resource_packs | If the file is named: `world_resource_packs.json` |

---

## Resource packs

For best results, name your folder with the letters RP/rp in them. If the resourcepack is inside the `resource_packs` folder inside the world folder it will be identified as well.

| Schema                | When is it applied                                                                                                                                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animation controllers | Must be inside an identifiable resource pack. Must be located in the folder: `animation_controllers` or sub-folder thereof.                                                                                             |
| Animations            | Must be inside an identifiable resource pack. Must be located in the folder: `animations` or sub-folder thereof.                                                                                                        |
| Attachables           | Must be located in the folder; `attachables` or sub-folder thereof.                                                                                                                                                     |
| Biomes client         | If the file is named: `biomes_client.json`                                                                                                                                                                              |
| Blocks                | If the file is named: `blocks.json`                                                                                                                                                                                     |
| Entity                | Must be located in the folder: `entity` or sub-folder thereof. Or the filename endswith: `.entity.rp.json`                                                                                                              |
| Entity models         | Can be one of the following:<br/>Must be inside an identifiable resource pack. Must be located in the folder: `models/entity` or sub-folder thereof.<br/>The filename ends either with: `.geo.json` OR `.geometry.json` |
| Flipbook textures     | If the file is named: `flipbook_textures.json`                                                                                                                                                                          |
| Fog                   | Must be located in the folder: `fogs` or sub-folder thereof.                                                                                                                                                            |
| Item texture          | If the file is named: `item_texture.json`                                                                                                                                                                               |
| Items                 | Must be inside an identifiable resource pack. Must be located in the folder: `items` or sub-folder thereof. Or the filename endswith: `.item.rp.json`                                                                   |
| Materials             | Must be located in the folder: `material` or sub-folder thereof. And needs the extension `.material`.                                                                                                                   |
| Music definitions     | If the file is named: `music_definitions.json`                                                                                                                                                                          |
| Particles             | Can be one of the following:<br/>Must be inside an identifiable resource pack. Must be located in the folder: `particles` or sub-folder thereof.<br/>The filename ends either with: `.particle.json`                    |
| Render controllers    | Must be located in the folder: `render_controller` or sub-folder thereof. Or the filename endswith: `.render.json`                                                                                                      |
| Sound definitions     | If the file is named: `sound_definitions.json`                                                                                                                                                                          |
| Sounds                | If the file is named: `sounds.json`                                                                                                                                                                                     |
| Terrain texture       | If the file is named: `terrain_texture.json`                                                                                                                                                                            |
| Terrain list          | If the file is named: `texture_list.json`                                                                                                                                                                               |

---

## Behavior packs

For best results, name your folder with the letters BP/bp in them. If the behavior pack is inside the `behavior_packs` folder inside the world folder it will be identified as well.

| Schema                | When is it applied                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Animation controllers | Must be inside an identifiable resource pack. Must be located in the folder: `animation_controllers` or sub-folder thereof.                                                                      |
| Animations            | Must be inside an identifiable resource pack. Must be located in the folder: `animations` or sub-folder thereof.                                                                                 |
| Biomes                | Must be inside an identifiable resource pack. Must be located in the folder: `biomes` or sub-folder thereof.                                                                                     |
| Blocks                | Must be inside an identifiable resource pack. Must be located in the folder: `blocks` or sub-folder thereof.                                                                                     |
| Entity behaviors      | Must be inside an identifiable resource pack. Must be located in the folder: `entities` or sub-folder thereof. Or the filename endswith: `.entity.bp.json`                                       |
| Item behaviors        | Must be inside an identifiable resource pack. Must be located in the folder: `items` or sub-folder thereof. Or the filename endswith: `.item.bp.json`                                            |
| Loot tables           | Must be inside an identifiable resource pack. Must be located in the folder: `loot_tables` or sub-folder thereof.                                                                                |
| Recipes               | Must be located in the folder: `recipes` or sub-folder thereof. Or the filename endswith: `.recipe.json`                                                                                         |
| Spawn rules           | Must be located in the folder: `spawn_rules` or sub-folder thereof. Or the filename endswith: `.spawn.json`                                                                                      |
| Trading               | Can be one of the following:<br/>Must be inside an identifiable resource pack. Must be located in the folder: `trading` or sub-folder thereof.<br/>The filename ends either with: `.trade.json`  |
| Volume                | Can be one of the following:<br/>Must be inside an identifiable resource pack. Must be located in the folder: `volumes` or sub-folder thereof.<br/>The filename ends either with: `.volume.json` |

---

## Skinpacks

| Schema | When is it applied                                                       |
| ------ | ------------------------------------------------------------------------ |
| Skins  | One files named `skins.json` that are inside a folder called `skin_pack` |

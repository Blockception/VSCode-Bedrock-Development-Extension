# Commands

- [Commands](#commands)
	- [Diagnose project](#diagnose-project)
	- [Cheat Sheets](#cheat-sheets)
	- [Create Files](#create-files)

## Diagnose project

`Blockception: Run diagnose on project`

This command causes the plugin to traverse the entire project and look for errors and problems. currently only mcfunctions are processed, but
entities, particles and items are to be included in the future + many more. The diagnoses also uses [validation rules](./validation/Validation.md)

## Cheat Sheets

Cheat sheet are accesable through the following command(s):

| Command                                        | Description                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| `Blockception: Cheat sheet: Molang`            | Displays the cheat sheet for molang, containing filters, queries and more |
| `Blockception: Cheat sheet: Behaviors Filters` | Displays the cheat sheet for filters                                      |

## Create Files

All these command do not work if the file already exists. These commands are only enabled on workspaces being present. They requires manifest for the
world or the BP & RP to exist

| Command                                             | Description                                                                       |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Create BP-RP entities files`                       | Creates resource pack and behaviour pack entities file                            |
| `Create all language files`                         | Creates for all known worlds, resourcepacks, and behaviourpacks `texts` folders   |
| `Create all manifests`                              | Creates for all known worlds, resourcepacks, and behaviourpacks `texts` manifests |
| `Behavior Pack: Create animation controllers file`  | Creates an animation controller for the behavior pack                             |
| `Behavior Pack: Create animations file`             | Creates an animations for the behavior pack                                       |
| `Behavior Pack: Create block file`                  | Creates a block for the behavior pack                                             |
| `Behavior Pack: Create entities file`               | Creates an entities for the behavior pack                                         |
| `Behavior Pack: Create item file`                   | Creates an item for the behavior pack                                             |
| `Behavior Pack: Create language files`              | Creates the language files for the behavior pack                                  |
| `Behavior Pack: Create loot_table file`             | Creates a loot table for the behavior pack                                        |
| `Behavior Pack: Create manifest`                    | Creates a manifest for the behavior pack                                          |
| `Behavior Pack: Create recipe file`                 | Creates a recipe for the behavior pack                                            |
| `Behavior Pack: Create spawn_rule file`             | Creates a spawn rule for the behavior pack                                        |
| `Behavior Pack: Create trading file`                | Creates a trading for the behavior pack                                           |
| `Resource Pack: Create animation controllers files` | Creates an animation controller for the resource pack                             |
| `Resource Pack: Create animations files`            | Creates an animation for the resource pack                                        |
| `Resource Pack: Create attachable files`            | Creates an attachable for the resource pack                                       |
| `Resource Pack: Create the biomes_client file`      | Creates the `biomes_client.json` file in the resource pack                        |
| `Resource Pack: Create the blocks file files`       | Creates the `blocks.json` file in the resource pack                               |
| `Resource Pack: Create entities files`              | Creates an entities for the resource pack                                         |
| `Resource Pack: Create flipbook_textures files`     | Creates the `flipbook_textures.json` file in the resource pack                    |
| `Resource Pack: Create language files`              | Creates the language files for the resource pack                                  |
| `Resource Pack: Create item texture file`           | Creates the `item_texture.json` file in the resource pack                         |
| `Resource Pack: Create manifest`                    | Creates a manifest for the resource pack                                          |
| `Resource Pack: Create model file`                  | Creates a model for the resource pack                                             |
| `Resource Pack: Create the music definitions file`  | Creates the `biomes_client.json` file in the resource pack                        |
| `Resource Pack: Create the particle file`           | Creates a particle file for the resource pack                                     |
| `Resource Pack: Create the render controller file`  | Creates a render controller for the resource pack                                 |
| `Resource Pack: Create the sounds file`             | Creates the `sounds.json` file in the resource pack                               |
| `Resource Pack: Create the sound definitions file`  | Creates the `sound_definitions.json` file in the resource pack                    |
| `Resource Pack: Create the terrain texture file`    | Creates an the for the resource pack                                              |
| `World: Create language files`                      | Creates the language files for the world                                          |
| `World: Create all manifest`                        | Creates a manifest for the world                                                  |

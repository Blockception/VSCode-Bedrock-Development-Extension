# VSCode-Bedrock-Development-Extension
An extension that provides code completion, validations, formatters, diagnostics, and development tools to help develop Minecraft bedrock content.
Recommended you use the Dark+ theme for the best color highlighting. This package also supports Minecraft education.

![overview](documentation/resources/overview.gif)

## Content
- [VSCode-Bedrock-Development-Extension](#vscode-bedrock-development-extension)
  - [Content](#content)
  - [## Features](#h2-idfeatures-38featuresh2)
    - [Mcfunction](#mcfunction)
    - [Json](#json)
      - [Molang](#molang)
      - [Validation](#validation)
    - [Language files](#language-files)
    - [Molang](#molang-1)
  - [Extension Settings](#extension-settings)
  - [Licenses](#licenses)

## Features
---

### Mcfunction
This plugin provides support for the `.mcfunction` files. The following features are provided:
- Code completion.
- Code formatting.
- Diagnostics.
- Go to definition.
- Regions
- Symbols.
- Syntax highlighting.

---
### Json

#### Molang
This plugin provides automatic highlighting for Molang code in json files.

#### Validation
Automatic json validation is applied if the files follow a given pattern for naming or proper file structure.  
For resource packs, have the files in a folder with the letter `RP` or `rp` in the name, or in the world folder: `resource_packs`.  
For behavior packs, have the files in a folder with the letter `BP` or `bp` in the name, or in the world folder: `behavior_packs`.  

- [General.](./documentation/Json%20Validation.md#general)
  - Manifests.
  - Languages.
  - Language Names.
- [World.](./documentation/Json%20Validation.md#world)
  - world_behavior_packs.
  - world_resource_packs.
- [Resource pack.](./documentation/Json%20Validation.md#resource-packs)
  - Animation controllers.
  - Animations.
  - Attachables.
  - Biomes.
  - Blocks.
  - Entity.
  - Entity Models.
  - Flipbook textures.
  - Item textures.
  - Materials.
  - Music definitions.
  - Particles.
  - Render controllers.
  - Sound definitions.
  - Sounds.
  - Terrain texture.
- [Behaviour pack.](./documentation/Json%20Validation.md#behaviour-packs)
  - Animation controllers.
  - Animations.
  - Blocks.
  - Entity behaviours.
  - Item behaviours.
  - Loot tables.
  - Recipes.
  - Spawn rules.
  - Trading.

---
### Language files
This plugin provides support for the `.lang` files. The following features are provided:
- Code formatting.
- Diagnostics.
- Regions
- Symbols.
- Syntax highlighting.

---
### Molang
This plugin provides automatic highlighting for Molang code in json files. As well as for files that have the extension .molang. officially these files are not supported by Minecraft, but are usefull for developing Molang.

---
## Extension Settings

- **Use Education Content**: Adds education contents such as items, blocks, entities and commands into the suggestion and/or debugging. requires a
  restart for full effect.


## Licenses
In [Licenses](./LICENSENS/Licenses.md) all thrid party code and library are listed that make this plugin possible!
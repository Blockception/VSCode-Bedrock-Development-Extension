# VSCode-Bedrock-Development-Extension
An extension that provides code completion, validations, formatters, diagnostics, and development tools to help develop Minecraft Bedrock content.
It's recommended you use the Dark+ theme for the best color highlighting. This package also supports Minecraft Education Edition.

![overview](documentation/resources/overview.gif)

## Content
- [VSCode-Bedrock-Development-Extension](#vscode-bedrock-development-extension)
  - [Content](#content)
  - [Features](#features)
    - [Mcfunction](#mcfunction)
    - [JSON](#json)
      - [Molang](#molang)
      - [Validation](#validation)
    - [Language files](#language-files)
    - [Molang](#molang-1)
  - [Extension Settings](#extension-settings)
  - [Licenses](#licenses)
  
## Features

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
### JSON

#### Molang
This plugin provides automatic highlighting for Molang code in JSON files.

#### Validation
Automatic JSON validation is applied if the files follow a given pattern for naming or proper file structure.  
For resource packs, have the files in a folder with the letter `RP` or `rp` in the name, or in the world folder: `resource_packs`.  
For behavior packs, have the files in a folder with the letter `BP` or `bp` in the name, or in the world folder: `behavior_packs`.  

- [**General**](./documentation/Json%20Validation.md#general)
  - Manifests
  - Languages
  - Language names
- [**World**](./documentation/Json%20Validation.md#world)
  - world_behavior_packs
  - world_resource_packs
- [**Resource packs**](./documentation/Json%20Validation.md#resource-packs)
  - Animation controllers
  - Animations
  - Attachables
  - Biomes
  - Blocks
  - Entities
  - Entity models
  - Flipbook textures
  - Item textures
  - Materials
  - Music definitions
  - Particles
  - Render controllers
  - Sound definitions
  - Sounds
  - Terrain textures
- [**Behaviour packs**](./documentation/Json%20Validation.md#behaviour-packs)
  - Animation controllers
  - Animations
  - Blocks
  - Entity behaviours
  - Item behaviours
  - Loot tables
  - Recipes
  - Spawn rules
  - Trading

---
### Language files
This plugin provides support for `.lang` files. The following features are provided:
- Code formatting
- Diagnostics
- Regions
- Symbols
- Syntax highlighting

---
### Molang
This plugin provides automatic highlighting for Molang code in JSON files and .molang files. Officially .molang files are not supported by Minecraft, but they're useful for development.

---
## Extension Settings

- **Use Education Content**: Adds Education Edition content such as items, blocks, entities and commands into code suggestions and debugging. Requires a
  restart for full effect.


## Licenses
All thrid party code and libraries this plugin uses are listed [**here**](./LICENSENS/Licenses.md)!

# Templates

You can override the plugins template or filenames creation.
This is accomplished through the [`.mcattributes`](../project/MCAttributes.md)

Each template has a filename and a file section:

`.filename` works as a template string itself and is used to specify the folder and filename of the file., example : `entities/${{id.safe}}.entity.json`  
`.file` is the content of the file. and the content is treated as a template  

## Replaceable variables

In [template variables](./variables.md) you can find all the available variables. You can use ${{}} to specify a place where the plugin needs to replace a variable.

## Example

```ini
template.behavior.entity.filename=entities/${{id}}.bp.entity.json
template.behavior.entity.file=./.minecraft/templates/entity.bp.json
```

```json
{
  "format_version": "1.20.41",
  "minecraft:block": {
    "description": {
      "identifier": "${{id}}",
      "register_to_creative_menu": true
    },
    "components": {
    }
  }
}
```


## List of attribute
In the attribute file you can specify the following attributes:

| Attribute                                       | Description                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| template.behavior.animation_controller.filename | The template string of the file                                   |
| template.behavior.animation_controller.file     | The filepath to the template file for the content of the template |
| template.behavior.animation.filename            | The template string of the file                                   |
| template.behavior.animation.file                | The filepath to the template file for the content of the template |
| template.behavior.block.filename                | The template string of the file                                   |
| template.behavior.block.file                    | The filepath to the template file for the content of the template |
| template.behavior.entity.filename               | The template string of the file                                   |
| template.behavior.entity.file                   | The filepath to the template file for the content of the template |
| template.behavior.dialogue.filename             | The template string of the file                                   |
| template.behavior.dialogue.file                 | The filepath to the template file for the content of the template |
| template.behavior.item.filename                 | The template string of the file                                   |
| template.behavior.item.file                     | The filepath to the template file for the content of the template |
| template.behavior.loot_table.filename           | The template string of the file                                   |
| template.behavior.loot_table.file               | The filepath to the template file for the content of the template |
| template.behavior.manifest.filename             | The template string of the file                                   |
| template.behavior.manifest.file                 | The filepath to the template file for the content of the template |
| template.behavior.recipe.filename               | The template string of the file                                   |
| template.behavior.recipe.file                   | The filepath to the template file for the content of the template |
| template.behavior.spawn_rule.filename           | The template string of the file                                   |
| template.behavior.spawn_rule.file               | The filepath to the template file for the content of the template |
| template.behavior.trading.filename              | The template string of the file                                   |
| template.behavior.trading.file                  | The filepath to the template file for the content of the template |
| template.behavior.volume.filename               | The template string of the file                                   |
| template.behavior.volume.file                   | The filepath to the template file for the content of the template |
| template.resource.animation_controller.filename | The template string of the file                                   |
| template.resource.animation_controller.file     | The filepath to the template file for the content of the template |
| template.resource.animation.filename            | The template string of the file                                   |
| template.resource.animation.file                | The filepath to the template file for the content of the template |
| template.resource.attachable.filename           | The template string of the file                                   |
| template.resource.attachable.file               | The filepath to the template file for the content of the template |
| template.resource.biomes_client.filename        | The template string of the file                                   |
| template.resource.biomes_client.file            | The filepath to the template file for the content of the template |
| template.resource.blocks.filename               | The template string of the file                                   |
| template.resource.blocks.file                   | The filepath to the template file for the content of the template |
| template.resource.entity.filename               | The template string of the file                                   |
| template.resource.entity.file                   | The filepath to the template file for the content of the template |
| template.resource.fog.filename                  | The template string of the file                                   |
| template.resource.fog.file                      | The filepath to the template file for the content of the template |
| template.resource.flipbook_textures.filename    | The template string of the file                                   |
| template.resource.flipbook_textures.file        | The filepath to the template file for the content of the template |
| template.resource.item_texture.filename         | The template string of the file                                   |
| template.resource.item_texture.file             | The filepath to the template file for the content of the template |
| template.resource.manifest.filename             | The template string of the file                                   |
| template.resource.manifest.file                 | The filepath to the template file for the content of the template |
| template.resource.model.filename                | The template string of the file                                   |
| template.resource.model.file                    | The filepath to the template file for the content of the template |
| template.resource.music_definitions.filename    | The template string of the file                                   |
| template.resource.music_definitions.file        | The filepath to the template file for the content of the template |
| template.resource.particle.filename             | The template string of the file                                   |
| template.resource.particle.file                 | The filepath to the template file for the content of the template |
| template.resource.render_controller.filename    | The template string of the file                                   |
| template.resource.render_controller.file        | The filepath to the template file for the content of the template |
| template.resource.sounds.filename               | The template string of the file                                   |
| template.resource.sounds.file                   | The filepath to the template file for the content of the template |
| template.resource.sound_definitions.filename    | The template string of the file                                   |
| template.resource.sound_definitions.file        | The filepath to the template file for the content of the template |
| template.resource.terrain_texture.filename      | The template string of the file                                   |
| template.resource.terrain_texture.file          | The filepath to the template file for the content of the template |
| template.world.manifest.filename                | The template string of the file                                   |
| template.world.manifest.file                    | The filepath to the template file for the content of the template |
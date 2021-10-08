export const animation_controller: string = `{
  "format_version" : "1.10.0",
  "animation_controllers" : {
    "controller.animation.\${{id}}.example" : {
      "initial_state" : "default",
      "states" : {
        "default" : {
          "animations" : [ "default_animation" ],
          "transitions" : [
            { "state_1" : "query.is_baby" }
          ]
        },
        "state_1" : {
          "animations" : [ "state_animation" ],
          "transitions" : [
            { "default" : "!query.is_baby" }
          ]
        }
      }
    }
  }
}`;

export const animation: string = `{
  "format_version": "1.10.0",
  "animations": {
    "animation.\${{safeid}}.example": {
      "animation_length": 5,
      "bones": {}
    }
  }
}`;

export const attachable: string = `{
  "format_version": "1.10.0",
  "minecraft:attachable": {
    "description": {
      "identifier": "\${{id}}",
      "materials": {
        "default": "armor",
        "enchanted": "armor_enchanted"
      },
      "textures": {
        "default": "textures/example",
        "enchanted": "textures/misc/enchanted_item_glint"
      },
      "geometry": {
        "default": "geometry.example"
      },
      "scripts": {},
      "render_controllers": [ "controller.render.example" ]
    }
  }
}`;

export const blocks: string = `{
  "Example": {
    "textures": "example",
    "sound": "obsidian"
  }
}`;

export const biomes_client: string = `{
  "biomes" : {

  }
}`;

export const entity: string = `{
  "format_version": "1.17.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "\${{id}}",
      "min_engine_version": "1.8.0",
      "materials": { "default": "entity", "alpha": "entity_alphatest" },
      "textures": { "default": "textures/entity/\${{safeid}}/\${{safeid}}" },
      "render_controllers": ["controller.render.default"],
      "geometry": { "default": "geometry.\${{safeid}}" },
      "animations": {
        "default_pose": "animation.\${{safeid}}.default_pose",
        "controller.pose": "controller.animation.\${{safeid}}.pose"
      },
      "scripts": {
        "initialize": [
          "variable.example.a = 0;",
          "variable.example.b = 0;"
        ],
        "animate": [
          "controller.pose"
        ]
      }
    }
  }
}`;

export const fog: string = `{
  "format_version": "1.16.100",
  "minecraft:fog_settings": {
    "description": {
      "identifier": "\${{id}}"
    },
    "distance": {
      "air": {
        "fog_color": "#402347",
        "fog_start": 10,
        "fog_end": 100,
        "render_distance_type": "fixed"
      }
    }
  }
}`;

export const flipbook_textures: string = `[
  {
    "flipbook_texture": "textures/example",
    "atlas_tile": "example",
    "ticks_per_frame": 15
  }
]`;

export const item_texture: string = `{
  "resource_pack_name": "vanilla",
  "texture_data": {
    "example": {
      "textures": "textures/items/example"
    }
  }
}`;

export const manifest: string = `{
  "format_version": 2,
  "header": {
    "description": "Example vanilla resource pack",
    "name": "Vanilla Resource Pack",
    "uuid": "\${{uuid}}",
    "version": [1, 0, 0],
    "min_engine_version": [ 1, 16, 200 ]
  },
  "modules": [
    {
      "description": "Example vanilla resource pack",
      "type": "resources",
      "uuid": "\${{uuid}}",
      "version": [1, 0, 0]
    }
  ]
}`;

export const model: string = `{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "\${{id}}",
        "texture_width": 16,
        "texture_height": 16,
        "visible_bounds_width": 2,
        "visible_bounds_height": 3,
        "visible_bounds_offset": [0, 0.5, 0]
      },
      "bones": [
        {
          "name": "body",
          "pivot": [0, 0, 0],
          "cubes": [
          ]
        }
      ]
    }
  ]
}`;

export const music_definitions: string = `{
  "creative" : {
     "event_name" : "music.game.creative",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "credits" : {
     "event_name" : "music.game.credits",
     "max_delay" : 0,
     "min_delay" : 0
  },
  "crimson_forest" : {
     "event_name" : "music.game.crimson_forest",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "end" : {
     "event_name" : "music.game.end",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "endboss" : {
     "event_name" : "music.game.endboss",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "game" : {
     "event_name" : "music.game",
     "max_delay" : 1200,
     "min_delay" : 600
  },
  "hell" : {
     "event_name" : "music.game.nether_wastes",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "menu" : {
     "event_name" : "music.menu",
     "max_delay" : 30,
     "min_delay" : 0
  },
  "nether" : {
     "event_name" : "music.game.nether",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "soulsand_valley" : {
     "event_name" : "music.game.soulsand_valley",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "water" : {
     "event_name" : "music.game.water",
     "max_delay" : 20,
     "min_delay" : 10
  }
}`;

export const particle: string = `{
  "format_version": "1.10.0",
  "particle_effect": {
    "description": {
      "identifier": "\${{id}}",
      "basic_render_parameters": {
        "material": "particles_alpha",
        "texture": "textures/particle/particles"
      }
    },
    "components": {
    }
  }
}`;

export const render_controller: string = `{
  "format_version": "1.8.0",
  "render_controllers": {
    "controller.render.\${{id}}": {
      "geometry": "Geometry.default",
      "materials": [
        { "*": "Material.default" }, 
        { "Alpha*": "Material.alpha" }
      ],
      "textures": ["Texture.default"]
    }
  }
}
`;

export const sounds: string = `{
  "block_sounds" : {     
  },
  "entity_sounds" : {
     "defaults" : {        
     },
     "entities" : {        
     }
  },
  "individual_event_sounds" : {
     "events" : {        
     }
  },
  "interactive_sounds" : {
     "block_sounds" : {        
     },
     "entity_sounds" : {        
     }
  }
}`;

export const sound_definitions: string = `{
  "format_version" : "1.14.0",
  "sound_definitions" : {
     "example" : {
        "category" : "ambient",
        "sounds" : [
           "sounds/example/fx1",
           "sounds/example/fx2",
           "sounds/example/fx3",
           "sounds/example/fx4"
        ]
     }
  }
}`;

export const terrain_texture: string = `{
  "num_mip_levels": 4,
  "padding": 8,
  "resource_pack_name": "vanilla",
  "texture_data": {
    "example": {
      "textures": "textures/blocks/example"
    }
  }
}`;

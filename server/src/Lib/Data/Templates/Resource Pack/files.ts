import { SafeID, SafeIDNoNamespace } from "../Function";

/**The template for the resourcepack animation controller*/
export function create_animation_controller(ID: string): string {
  return animation_controller.replace(/%ID%/gi, ID);
}
const animation_controller: string = `{
  "format_version" : "1.10.0",
  "animation_controllers" : {
    "controller.animation.%ID%.example" : {
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

/**The template for the resourcepack animation*/
export function create_animation(ID: string): string {
  return animation.replace(/%SafeID%/gi, SafeID(ID, "."));
}
const animation: string = `{
  "format_version": "1.10.0",
  "animations": {
    "animation.%SafeID%.example": {
      "animation_length": 5,
      "bones": {}
    }
  }
}`;

/**The template for the resourcepack attachable*/
export function create_attachable(ID: string): string {
  return attachable.replace(/%ID%/gi, ID);
}
const attachable: string = `{
  "format_version": "1.10.0",
  "minecraft:attachable": {
    "description": {
      "identifier": "%ID%",
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

/**The template for the resourcepack blocks.json*/
export function create_blocks(): string {
  return blocks;
}
const blocks: string = `{
  "Example": {
    "textures": "example",
    "sound": "obsidian"
  }
}`;

/**The template for the resourcepack biomes_client*/
export function create_biomes_client(): string {
  return biomes_client;
}
const biomes_client: string = `{
  "biomes" : {

  }
}`;

/**The template for the entity resourcepack definition */
export function create_entity(ID: string): string {
  const SafeID = SafeIDNoNamespace(ID);

  return entity.replace(/%ID%/gi, ID).replace(/%SafeID%/gi, SafeID);
}
const entity: string = `{
  "format_version": "1.17.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "%ID%",
      "min_engine_version": "1.8.0",
      "materials": { "default": "entity", "alpha": "entity_alphatest" },
      "textures": { "default": "textures/entity/%SafeID%/%SafeID%" },
      "render_controllers": ["controller.render.default"],
      "geometry": { "default": "geometry.%SafeID%" },
      "animations": {
        "default_pose": "animation.%SafeID%.default_pose",
        "controller.pose": "controller.animation.%SafeID%.pose"
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

export function create_fog(ID: string) {
  return fog.replace(/%ID%/gi, ID);
}
const fog: string = `{
  "format_version": "1.16.100",
  "minecraft:fog_settings": {
    "description": {
      "identifier": "%ID%"
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

/**The template for the resourcepack flipbook_textures*/
export function create_flipbook_textures(): string {
  return flipbook_textures;
}
const flipbook_textures: string = `[
  {
    "flipbook_texture": "textures/example",
    "atlas_tile": "example",
    "ticks_per_frame": 15
  }
]`;

/**The template for the resourcepack item_texture*/
export function create_item_texture(): string {
  return item_texture;
}
const item_texture: string = `{
  "resource_pack_name": "vanilla",
  "texture_data": {
    "example": {
      "textures": "textures/items/example"
    }
  }
}`;

/**The template for the resourcepack manifest*/
export function create_manifest(UUID1: string, UUID2: string): string {
  return manifest.replace(/%UUID1%/gi, UUID1).replace(/%UUID2%/gi, UUID2);
}
const manifest: string = `{
  "format_version": 2,
  "header": {
    "description": "Example vanilla resource pack",
    "name": "Vanilla Resource Pack",
    "uuid": "%UUID1%",
    "version": [1, 0, 0],
    "min_engine_version": [ 1, 16, 200 ]
  },
  "modules": [
    {
      "description": "Example vanilla resource pack",
      "type": "resources",
      "uuid": "%UUID2%",
      "version": [1, 0, 0]
    }
  ]
}`;

/**The template for the resourcepack model*/
export function create_model(ID: string): string {
  return model.replace(/%ID%/gi, ID);
}
const model: string = `{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "%ID%",
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

/**The template for the resourcepack music_definitions*/
export function create_music_definitions(): string {
  return music_definitions;
}
const music_definitions: string = `{
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

/**The template for the resourcepack particle*/
export function create_particle(ID: string): string {
  return particle.replace(/%ID%/gi, ID);
}
const particle: string = `{
  "format_version": "1.10.0",
  "particle_effect": {
    "description": {
      "identifier": "%ID%",
      "basic_render_parameters": {
        "material": "particles_alpha",
        "texture": "textures/particle/particles"
      }
    },
    "components": {
    }
  }
}`;

/**The template for the resourcepack render_controller*/
export function create_render_controller(ID: string): string {
  return render_controller.replace(/%ID%/gi, ID);
}
const render_controller: string = `{
  "format_version": "1.8.0",
  "render_controllers": {
    "controller.render.%ID%": {
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

/**The template for the resourcepack sounds*/
export function create_sounds(): string {
  return sounds;
}
const sounds: string = `{
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

/**The template for the resourcepack sound_definitions*/
export function create_sound_definitions(): string {
  return sound_definitions;
}
const sound_definitions: string = `{
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

/**The template for the resourcepack terrain_texture*/
export function create_terrain_texture(): string {
  return terrain_texture;
}
const terrain_texture: string = `{
  "num_mip_levels": 4,
  "padding": 8,
  "resource_pack_name": "vanilla",
  "texture_data": {
    "example": {
      "textures": "textures/blocks/example"
    }
  }
}`;

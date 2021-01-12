/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { SafeID } from './Function';

/**The template for the resourcepack animation controller*/
export function create_animation_controller(ID: string): string { return animation_controller.replace(/%ID%/gi, ID); }
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
export function create_animation(ID: string): string { return animation_controller.replace(/%SafeID%/gi, SafeID(ID, '.')); }
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
export function create_attachable(ID: string): string { return attachable.replace(/%ID%/gi, ID); }
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
export function create_blocks(ID: string): string { return blocks.replace(/%ID%/gi, ID); }
const blocks: string = `{
  "%ID%": {
    "textures": "example",
    "sound": "obsidian"
  }
}`;

/**The template for the resourcepack biomes_client*/
export function create_biomes_client(): string { return biomes_client; }
const biomes_client: string = `{
  "biomes" : {

  }
}`;

/**The template for the entity resourcepack definition */
export function create_entity(ID: string): string { return entity.replace(/%ID%/gi, ID); }
const entity: string = `{
  "format_version": "1.10.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "%ID%",
      "min_engine_version": "1.8.0",
      "materials": {
				"default": "entity",
				"alpha": ""
      },
      "textures": {
        "default": "textures/entity/example"
      },
      "animations": {
        "default_pose": "animation.armor_stand.default_pose",
        "controller.pose": "controller.animation.armor_stand.pose",
        "controller.wiggling": "controller.animation.armor_stand.wiggle"
      },
      "scripts": {
        "initialize": [
          "variable.armor_stand.pose_index = 0;",
          "variable.armor_stand.hurt_time = 0;"
        ],
        "animate": [
          "controller.pose",
          "controller.wiggling"
        ]
      },
      "geometry": {
        "default": "geometry.armor_stand"
      },
      "render_controllers": [ "controller.render.armor_stand" ],
      "enable_attachables": true
    }
  }
}`;

/**The template for the resourcepack flipbook_textures*/
export function create_flipbook_textures(ID: string): string { return flipbook_textures.replace(/%ID%/gi, ID); }
const flipbook_textures: string = `[
  {
    "flipbook_texture": "textures/example",
    "atlas_tile": "example",
    "ticks_per_frame": 15
  }
]`;

/**The template for the resourcepack item_texture*/
export function create_item_texture(ID: string): string { return item_texture.replace(/%ID%/gi, ID); }
const item_texture: string = `{
  "resource_pack_name" : "vanilla",
  "texture_data" : {
      "example" : {
        "textures" : "textures/items/example"
      }
    }
  }
}`;

/**The template for the resourcepack manifest*/
export function create_manifest(UUID1: string, UUID2: string): string { return manifest.replace(/%UUID1%/gi, UUID1).replace(/%UUID2%/gi, UUID2); }
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
export function create_model(ID: string): string { return model.replace(/%ID%/gi, ID); }
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
export function create_music_definitions(): string { return music_definitions; }
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
export function create_particle(ID: string): string { return particle.replace(/%ID%/gi, ID); }
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
export function create_render_controller(ID: string): string { return render_controller.replace(/%ID%/gi, ID); }
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
export function create_sounds(ID: string): string { return sounds.replace(/%ID%/gi, ID); }
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
export function create_sound_definitions(): string { return sound_definitions; }
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
export function create_terrain_texture(ID: string): string { return terrain_texture.replace(/%ID%/gi, ID); }
const terrain_texture: string = `{
  "num_mip_levels" : 4,
  "padding" : 8,
  "resource_pack_name" : "vanilla",
  "texture_data" : {
     "example" : {
        "textures" : "textures/blocks/example"
      },
    }
  }
}`;
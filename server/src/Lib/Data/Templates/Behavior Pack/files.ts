import { SafeIDNoNamespace } from "../Function";

/**The template for the behaviorpack animation_controller*/
export function create_animation_controller(ID: string): string {
  return animation_controller.replace(/%ID%/gi, ID);
}
const animation_controller: string = `{
	"format_version" : "1.10.0",
	"animation_controllers" : {
		"controller.animation.%ID%" : {
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
					"on_entry": ["@s example:foo"],
					"on_exit": ["/tp @s ~ ~2 ~"],
					"transitions" : [
						{ "default" : "!query.is_baby" }
					]
				}
			}
		}
	}
}`;

/**The template for the behaviorpack animation*/
export function create_animation(ID: string): string {
  return animation.replace(/%ID%/gi, ID);
}
const animation: string = `{
  "format_version": "1.8.0",
  "animations": {
    "animation.%ID%": {
      "loop": false,
      "timeline": {
        "0.0": [],
        "1.36": ["/tp @s ~ -40 ~", "/kill @s"]
      },
      "animation_length": 1.5
    }
  }
}`;

/**The template for the behaviorpack block*/
export function create_block(ID: string): string {
  return block.replace(/%ID%/gi, ID);
}
const block: string = `{
  "format_version": "1.16.0",
  "minecraft:block": {
    "description": {
      "identifier": "%ID%",
      "register_to_creative_menu": true
    },
    "components": {
    }
  }
}`;

/**The template for the behaviorpack entity*/
export function create_entity(ID: string): string {
  const SafeID = SafeIDNoNamespace(ID);

  return entity.replace(/%ID%/gi, ID).replace(/%SafeID%/gi, SafeID);
}
const entity: string = `{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "%ID%",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
      "minecraft:type_family": { "family": ["%SafeID%"] }
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:behavior.look_at_player": { "probability": 1.0, "target_distance": 16 }
    },
    "events": {
    }
  }
}`;

/**The template for the behaviorpack item*/
export function create_item(ID: string): string {
  return item.replace(/%ID%/gi, ID);
}
const item: string = `{
  "format_version": "1.10.0",
  "minecraft:item": {
    "description": {
      "identifier": "%ID%"
    },
    "components": {
    }
  }
}`;

/**The template for the behaviorpack loot_table*/
export function create_loot_table(): string {
  return loot_table;
}
const loot_table: string = `{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:potato",
          "weight": 1
        }
      ]
    }
  ]
}`;

/**The template for the behaviorpack manifest*/
export function create_manifest(UUID1: string, UUID2: string): string {
  return manifest.replace(/%UUID1%/gi, UUID1).replace(/%UUID2%/gi, UUID2);
}
const manifest: string = `{
  "format_version": 2,
  "header": {
    "description": "Example vanilla behavior pack",
    "name": "Vanilla Behavior Pack",
    "uuid": "%UUID1%",
    "version": [1, 0, 0],
    "min_engine_version": [1, 16, 200]
  },
  "modules": [
    {
      "description": "Example vanilla behavior pack",
      "type": "data",
      "uuid": "%UUID2%",
      "version": [1, 0, 0]
    }
  ]
}`;

/**The template for the behaviorpack recipe*/
export function create_recipe(ID: string): string {
  return recipe.replace(/%ID%/gi, ID);
}
const recipe: string = `{
  "format_version": "1.12",
  "minecraft:<type>": {
    "description": {
    	"identifier": "%ID%"
    },

		"result": {
      "item": "minecraft:brewing_stand"
    }
  }
}`;

/**The template for the behaviorpack spawn_rule*/
export function create_spawn_rule(ID: string): string {
  return spawn_rule.replace(/%ID%/gi, ID);
}
const spawn_rule: string = `{
	"format_version": "1.8.0",
	"minecraft:spawn_rules": {
		"description": {
			"identifier": "%ID%",
			"population_control": "animal"
		},
		"conditions": [
			{
				
			}
		]
	}
}`;

/**The template for the behaviorpack trading*/
export function create_trading(ID: string): string {
  return trading.replace(/%ID%/gi, ID);
}
const trading: string = `{
  "tiers": [
    {
      "trades": [
        {
          "wants": [
            {
              "item": "minecraft:wheat",
              "quantity": {
                "min": 18,
                "max": 22
              }
            }
          ],
          "gives": [
            { "item": "minecraft:emerald" }
          ]
        }
      ]
    }
  ]
}`;

/**The template for the behaviorpack trading*/
export function create_volume(ID: string): string {
  return volume.replace(/%ID%/gi, ID);
}
const volume: string = `{
  "format_version": "1.17.0",
  "minecraft:volume": {
    "description": {
      "identifier": "%ID%"
    },
    "components": {
      "minecraft:bounds": {
        "min": [-50, 0, -50],
        "max": [50, 256, 50]
      },
      "minecraft:fog": {
        "fog_identifier": "minecraft:fog_savanna",
        "priority": 1
      }
    }
  }
}
`;

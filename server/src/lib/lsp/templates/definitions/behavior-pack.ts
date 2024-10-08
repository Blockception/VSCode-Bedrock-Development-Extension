export const animation_controller: string = `{
  "format_version": "1.20.41",
  "animation_controllers" : {
    "controller.animation.$\{{id}}" : {
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

export const animation: string = `{
  "format_version": "1.20.41",
  "animations": {
    "animation.$\{{id}}": {
      "loop": false,
      "timeline": {
        "0.0": [],
        "1.36": ["/tp @s ~ -40 ~", "/kill @s"]
      },
      "animation_length": 1.5
    }
  }
}`;

export const block: string = `{
  "format_version": "1.20.41",
  "minecraft:block": {
    "description": {
      "identifier": "$\{{id}}",
      "register_to_creative_menu": true
    },
    "components": {
    }
  }
}`;

export const entity: string = `{
  "format_version": "1.20.41",
  "minecraft:entity": {
    "description": {
      "identifier": "$\{{id}}",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
      "minecraft:type_family": { "family": ["$\{{id.safe.nonamespace}}"] },
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:damage_sensor": {
        "triggers": { "cause": "all", "deals_damage": false }
      }
    },
    "events": {
    }
  }
}`;

export const dialogue: string = `{
  "format_version": "1.20.41",
  "minecraft:npc_dialogue": {
    "scenes": [
      {
        "scene_tag": "$\{{id.safe.nonamespace}}",
        "npc_name": { "rawtext": [{ "translate": "dialogue.$\{{id.safe.nonamespace}}.name" }] },
        "text": { "rawtext": [{ "translate": "dialogue.$\{{id.safe.nonamespace}}.body", "with": ["\\n"] }] },
        "buttons": []
      }
    ]
  }
}`;

export const item: string = `{
  "format_version": "1.20.41",
  "minecraft:item": {
    "description": {
      "identifier": "$\{{id}}"
    },
    "components": {
    }
  }
}`;

export const loot_table: string = `{
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

export const manifest: string = `{
  "format_version": 2,
  "header": {
    "name": "pack.name",
    "description": "pack.description",
    "uuid": "$\{{uuid}}",
    "version": [1, 0, 0],
    "min_engine_version": [1, 19, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "$\{{uuid}}",
      "version": [1, 0, 0]
    }
  ],
  "metadata": {
    "authors": [ "$\{{project.attributes:author}}" ],
    "generated_with": {
      "$\{{tool}}": [
        "$\{{tool.version}}"
      ]
    }
  }
}`;

export const recipe: string = `{
  "format_version": "1.20.41",
  "minecraft:<type>": {
    "description": {
      "identifier": "$\{{id}}"
    },

    "result": {
      "item": "minecraft:brewing_stand"
    }
  }
}`;

export const spawn_rule: string = `{
  "format_version": "1.20.41",
  "minecraft:spawn_rules": {
    "description": {
      "identifier": "$\{{id}}",
      "population_control": "animal"
    },
    "conditions": [
      {
        
      }
    ]
  }
}`;

export const trading: string = `{
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

export const volume: string = `{
  "format_version": "1.20.41",
  "minecraft:volume": {
    "description": {
      "identifier": "$\{{id}}"
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

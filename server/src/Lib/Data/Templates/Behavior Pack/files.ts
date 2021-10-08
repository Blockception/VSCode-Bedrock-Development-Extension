export const animation_controller: string = `{
  "format_version" : "1.10.0",
  "animation_controllers" : {
    "controller.animation.\${{id}}" : {
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
  "format_version": "1.8.0",
  "animations": {
    "animation.\${{id}}": {
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
  "format_version": "1.17.0",
  "minecraft:block": {
    "description": {
      "identifier": "\${{id}}",
      "register_to_creative_menu": true
    },
    "components": {
    }
  }
}`;

export const entity: string = `{
  "format_version": "1.17.0",
  "minecraft:entity": {
    "description": {
      "identifier": "\${{id}}",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
      "minecraft:type_family": { "family": ["\${{safeid}}"] },
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
  "format_version": "1.14.0",
  "minecraft:npc_dialogue": {
    "scenes": [
      {
        "scene_tag": "\${{safeid}}",
        "npc_name": { "rawtext": [{ "translate": "dialogue.\${{safeid}}.name" }] },
        "text": { "rawtext": [{ "translate": "dialogue.\${{safeid}}.body", "with": ["\\n"] }] },
        "buttons": []
      }
    ]
  }
}`;

export const item: string = `{
  "format_version": "1.10.0",
  "minecraft:item": {
    "description": {
      "identifier": "\${{id}}"
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
    "description": "Example vanilla behavior pack",
    "name": "Vanilla Behavior Pack",
    "uuid": "\${{uuid}}",
    "version": [1, 0, 0],
    "min_engine_version": [1, 16, 200]
  },
  "modules": [
    {
      "description": "Example vanilla behavior pack",
      "type": "data",
      "uuid": "\${{uuid}}",
      "version": [1, 0, 0]
    }
  ]
}`;

export const recipe: string = `{
  "format_version": "1.17.0",
  "minecraft:<type>": {
    "description": {
      "identifier": "\${{id}}"
    },

    "result": {
      "item": "minecraft:brewing_stand"
    }
  }
}`;

export const spawn_rule: string = `{
  "format_version": "1.8.0",
  "minecraft:spawn_rules": {
    "description": {
      "identifier": "\${{id}}",
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
  "format_version": "1.17.0",
  "minecraft:volume": {
    "description": {
      "identifier": "\${{id}}"
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

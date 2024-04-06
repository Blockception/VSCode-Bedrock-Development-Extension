import path from "path";
import * as BP from "../../Data/Templates/behaviorpack";
import * as RP from "../../Data/Templates/resourcepack";
import * as WP from "../../Data/Templates/world";
import { TemplateFallback } from "../../Templates/Data";
import { TemplateProcessor } from "../../Templates/Processor";


export type TemplateKeys = "behavior-animation_controller" |
"behavior-animations" |
"behavior-block" |
"behavior-entity" |
"behavior-dialogue" |
"behavior-item" |
"behavior-loot_table" |
"behavior-manifest" |
"behavior-recipe" |
"behavior-spawn_rule" |
"behavior-trading" |
"behavior-volume" |
"resource-animation_controller" |
"resource-animations" |
"resource-attachable" |
"resource-biomes_client" |
"resource-blocks" |
"resource-block_culling" |
"resource-entity" |
"resource-fog" |
"resource-flipbook_textures" |
"resource-item_texture" |
"resource-manifest" |
"resource-model" |
"resource-music_definitions" |
"resource-particle" |
"resource-render_controller" |
"resource-sounds" |
"resource-sound_definitions" |
"resource-terrain_texture" |
"world-manifest";

export type TemplateMap<T> = Record<TemplateKeys, T>;

interface TemplateItem {
  filename: string;
  content: string;
}

export namespace Templates {
  export function get(key: TemplateKeys): TemplateItem | undefined {
    return TemplateFilenames[key];
  }

  export function getFallback(key: TemplateKeys): TemplateFallback | undefined {
    const item = get(key);

    if (item === undefined) return undefined;

    return {
      filename: () => item.filename,
      content: () => item.content,
    };
  }

  export async function create(
    key: TemplateKeys,
    folder: string,
    attributes: Record<string, string> = {}
  ): Promise<boolean> {
    const fallback = getFallback(key);
    if (fallback === undefined) return false;

    const processor = await TemplateProcessor.create(key, folder, attributes, fallback);
    processor.Process();

    await processor.CreateFile();
    return true;
  }
}

export const TemplateFilenames: TemplateMap<TemplateItem> = {
  //#region Behavior Pack
  "behavior-animation_controller": {
    //  ID = ID.replace("controller.", "");
    // ID = ID.replace("animation.", "");
    content: BP.bp_animation_controller,
    filename: path.join("animation_controllers", "${{id.safe}}.controller.json"),
  },
  "behavior-animations": {
    content: BP.bp_animation,
    filename: path.join("animations", "${{id.safe}}.animation.json"),
  },
  "behavior-block": {
    content: BP.bp_block,
    filename: path.join("blocks", "${{id.safe}}.block.json"),
  },
  "behavior-entity": {
    content: BP.bp_entity,
    filename: path.join("entities", "${{id.safe}}.entity.bp.json"),
  },
  "behavior-dialogue": {
    content: BP.bp_dialogue,
    filename: path.join("dialogue", "${{id.safe}}.dialogue.json"),
  },
  "behavior-item": {
    content: BP.bp_item,
    filename: path.join("items", "${{id.safe}}.item.json"),
  },
  "behavior-loot_table": {
    content: BP.bp_loot_table,
    filename: path.join("loot_tables", "${{id.safe}}.loot.json"),
  },
  "behavior-manifest": {
    content: BP.bp_manifest,
    filename: "manifest.json",
  },
  "behavior-recipe": {
    content: BP.bp_recipe,
    filename: path.join("recipes", "${{id.safe}}.recipe.json"),
  },
  "behavior-spawn_rule": {
    content: BP.bp_spawn_rule,
    filename: path.join("spawn_rules", "${{id.safe}}.spawn.json"),
  },
  "behavior-trading": {
    content: BP.bp_trading,
    filename: path.join("trading", "${{id.safe}}.trades.json"),
  },
  "behavior-volume": {
    content: BP.bp_volume,
    filename: path.join("volumes", "${{id.safe}}.volume.json"),
  },
  //#endregion

  //#region Resource Pack
  "resource-animation_controller": {
    //  ID = ID.replace("controller.", "");
    // ID = ID.replace("animation.", "");
    content: RP.rp_animation_controller,
    filename: path.join("animation_controllers", "${{id.safe}}.controller.json"),
  },
  "resource-animations": {
    content: RP.rp_animation,
    filename: path.join("animations", "${{id.safe}}.animation.json"),
  },
  "resource-attachable": {
    content: RP.rp_attachable,
    filename: path.join("attachables", "${{id.safe}}.attachable.json"),
  },
  "resource-biomes_client": {
    content: RP.rp_biomes_client,
    filename: "biomes_client.json",
  },
  "resource-blocks": {
    content: RP.rp_blocks,
    filename: "blocks.json",
  },
  "resource-block_culling": {
    content: RP.rp_block_culling,
    filename: path.join("block_culling", "${{id.safe}}.rule.json")
  },
  "resource-entity": {
    content: RP.rp_entity,
    filename: path.join("entity", "${{id.safe}}.entity.rp.json"),
  },
  "resource-fog": {
    content: RP.rp_fog,
    filename: path.join("fogs", "${{id.safe}}.fog.json"),
  },
  "resource-flipbook_textures": {
    content: RP.rp_flipbook_textures,
    filename: path.join("textures", "flipbook_textures.json"),
  },
  "resource-item_texture": {
    content: RP.rp_item_texture,
    filename: path.join("textures", "item_texture.png"),
  },
  "resource-manifest": {
    content: RP.rp_manifest,
    filename: "manifest.json",
  },
  "resource-model": {
    content: RP.rp_model,
    filename: path.join("models", "entity", "${{id.safe}}.geo.json"),
  },
  "resource-music_definitions": {
    content: RP.rp_music_definitions,
    filename: path.join("sounds", "music_definitions.json"),
  },
  "resource-particle": {
    content: RP.rp_particle,
    filename: path.join("particles", "${{id.safe}}.particle.json"),
  },
  "resource-render_controller": {
    // ID = ID.replace("controller.", "");
    // ID = ID.replace("render.", "");
    content: RP.rp_render_controller,
    filename: path.join("render_controllers", "${{id.safe}}.render.json"),
  },
  "resource-sounds": {
    content: RP.rp_sounds,
    filename: "sounds.json",
  },
  "resource-sound_definitions": {
    content: RP.rp_sound_definitions,
    filename: path.join("sounds", "sound_definitions.json"),
  },
  "resource-terrain_texture": {
    content: RP.rp_terrain_texture,
    filename: path.join("textures", "terrain_texture.json"),
  },
  //#endregion

  //#region World
  "world-manifest": {
    content: WP.manifest,
    filename: "manifest.json",
  },
  //#endregion
};

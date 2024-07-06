import path from "path";
import * as BP from "../../Data/Templates/behaviorpack";
import * as RP from "../../Data/Templates/resourcepack";
import * as WP from "../../Data/Templates/world";
import { TemplateFallback } from "../../Templates/Data";
import { TemplateProcessor } from "../../Templates/Processor";

export type TemplateKeys =
  | "behavior-animation_controllers"
  | "behavior-animations"
  | "behavior-block"
  | "behavior-entity"
  | "behavior-dialogue"
  | "behavior-item"
  | "behavior-loot_table"
  | "behavior-manifest"
  | "behavior-recipe"
  | "behavior-spawn_rule"
  | "behavior-trading"
  | "behavior-volume"
  | "resource-animation_controllers"
  | "resource-animations"
  | "resource-attachable"
  | "resource-biomes_client"
  | "resource-blocks"
  | "resource-block_culling"
  | "resource-entity"
  | "resource-fog"
  | "resource-flipbook_textures"
  | "resource-item_texture"
  | "resource-manifest"
  | "resource-model"
  | "resource-music_definitions"
  | "resource-particle"
  | "resource-render_controller"
  | "resource-sounds"
  | "resource-sound_definitions"
  | "resource-terrain_texture"
  | "world-manifest";

export type TemplateMap<T> = Record<TemplateKeys, T>;

interface TemplateItem {
  filename: string;
  content: string;
}

namespace TemplateItem {
  export function create(content: string, ...paths: string[]): TemplateItem {
    return {
      content,
      filename: paths.length === 1 ? paths[0] : path.join(...paths),
    };
  }
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
  "behavior-animation_controllers": TemplateItem.create(
    BP.bp_animation_controller,
    "animation_controllers",
    "${{id.safe}}.controller.json"
  ),
  "behavior-animations": TemplateItem.create(BP.bp_animation, "animations", "${{id.safe}}.animation.json"),
  "behavior-block": TemplateItem.create(BP.bp_block, "blocks", "${{id.safe}}.block.json"),
  "behavior-entity": TemplateItem.create(BP.bp_entity, "entities", "${{id.safe}}.entity.bp.json"),
  "behavior-dialogue": TemplateItem.create(BP.bp_dialogue, "dialogue", "${{id.safe}}.dialogue.json"),
  "behavior-item": TemplateItem.create(BP.bp_item, "items", "${{id.safe}}.item.json"),
  "behavior-loot_table": TemplateItem.create(BP.bp_loot_table, "loot_tables", "${{id.safe}}.loot.json"),
  "behavior-manifest": TemplateItem.create(BP.bp_manifest, "manifest.json"),
  "behavior-recipe": TemplateItem.create(BP.bp_recipe, "recipes", "${{id.safe}}.recipe.json"),
  "behavior-spawn_rule": TemplateItem.create(BP.bp_spawn_rule, "spawn_rules", "${{id.safe}}.spawn.json"),
  "behavior-trading": TemplateItem.create(BP.bp_trading, "trading", "${{id.safe}}.trades.json"),
  "behavior-volume": TemplateItem.create(BP.bp_volume, "volumes", "${{id.safe}}.volume.json"),
  //#endregion

  //#region Resource Pack
  "resource-animation_controllers": TemplateItem.create(
    RP.rp_animation_controller,
    "animation_controllers",
    "${{id.safe}}.controller.json"
  ),
  "resource-animations": TemplateItem.create(RP.rp_animation, "animations", "${{id.safe}}.animation.json"),
  "resource-attachable": TemplateItem.create(RP.rp_attachable, "attachables", "${{id.safe}}.attachable.json"),
  "resource-biomes_client": TemplateItem.create(RP.rp_biomes_client, "biomes_client.json"),
  "resource-blocks": TemplateItem.create(RP.rp_blocks, "blocks.json"),
  "resource-block_culling": TemplateItem.create(RP.rp_block_culling, "block_culling", "${{id.safe}}.rule.json"),
  "resource-entity": TemplateItem.create(RP.rp_entity, "entity", "${{id.safe}}.entity.rp.json"),
  "resource-fog": TemplateItem.create(RP.rp_fog, "fogs", "${{id.safe}}.fog.json"),
  "resource-flipbook_textures": TemplateItem.create(RP.rp_flipbook_textures, "textures", "flipbook_textures.json"),
  "resource-item_texture": TemplateItem.create(RP.rp_item_texture, "textures", "item_texture.png"),
  "resource-manifest": TemplateItem.create(RP.rp_manifest, "manifest.json"),
  "resource-model": TemplateItem.create(RP.rp_model, "models", "entity", "${{id.safe}}.geo.json"),
  "resource-music_definitions": TemplateItem.create(RP.rp_music_definitions, "sounds", "music_definitions.json"),
  "resource-particle": TemplateItem.create(RP.rp_particle, "particles", "${{id.safe}}.particle.json"),
  "resource-render_controller": TemplateItem.create(
    RP.rp_render_controller,
    "render_controllers",
    "${{id.safe}}.render.json"
  ),
  "resource-sounds": TemplateItem.create(RP.rp_sounds, "sounds.json"),
  "resource-sound_definitions": TemplateItem.create(RP.rp_sound_definitions, "sounds", "sound_definitions.json"),
  "resource-terrain_texture": TemplateItem.create(RP.rp_terrain_texture, "textures", "terrain_texture.json"),
  //#endregion

  //#region World
  "world-manifest": TemplateItem.create(WP.manifest, "manifest.json"),
  //#endregion
};

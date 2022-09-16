import path from "path";
import * as BP from "../../Data/Templates/BehaviorPack";
import * as RP from "../../Data/Templates/ResourcePack";
import * as WP from "../../Data/Templates/World";
import { TemplateFallback } from "../../Templates/Data";
import { TemplateProcessor } from "../../Templates/Processor";

export interface TemplateMap<T> {
  "behavior.animation_controller": T;
  "behavior.animation": T;
  "behavior.block": T;
  "behavior.entity": T;
  "behavior.dialogue": T;
  "behavior.item": T;
  "behavior.loot_table": T;
  "behavior.manifest": T;
  "behavior.recipe": T;
  "behavior.spawn_rule": T;
  "behavior.trading": T;
  "behavior.volume": T;

  "resource.animation_controller": T;
  "resource.animation": T;
  "resource.attachable": T;
  "resource.biomes_client": T;
  "resource.blocks": T;
  "resource.entity": T;
  "resource.fog": T;
  "resource.flipbook_textures": T;
  "resource.item_texture": T;
  "resource.manifest": T;
  "resource.model": T;
  "resource.music_definitions": T;
  "resource.particle": T;
  "resource.render_controller": T;
  "resource.sounds": T;
  "resource.sound_definitions": T;
  "resource.terrain_texture": T;

  "world.manifest": T;
}

export type TemplateKeys = keyof TemplateMap<never>;

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

  export async function create(key: TemplateKeys, folder: string): Promise<boolean> {
    const fallback = getFallback(key);
    if (fallback === undefined) return false;

    const processor = TemplateProcessor.create(key, folder, fallback);

    return processor.CreateFile().then(() => true);
  }
}

export const TemplateFilenames: TemplateMap<TemplateItem> = {
  //#region Behavior Pack
  "behavior.animation_controller": {
    //  ID = ID.replace("controller.", "");
    // ID = ID.replace("animation.", "");
    content: BP.animation_controller,
    filename: path.join("animation_controllers", "${{id.safe}}.controller.json"),
  },
  "behavior.animation": {
    content: BP.animation,
    filename: path.join("animations", "${{id.safe}}.animation.json"),
  },
  "behavior.block": {
    content: BP.block,
    filename: path.join("blocks", "${{id.safe}}.block.json"),
  },
  "behavior.entity": {
    content: BP.entity,
    filename: path.join("entities", "${{id.safe}}.entity.json"),
  },
  "behavior.dialogue": {
    content: BP.dialogue,
    filename: path.join("dialogue", "${{id.safe}}.dialogue.json"),
  },
  "behavior.item": {
    content: BP.item,
    filename: path.join("items", "${{id.safe}}.item.json"),
  },
  "behavior.loot_table": {
    content: BP.loot_table,
    filename: path.join("loot_tables", "${{id.safe}}.loot.json"),
  },
  "behavior.manifest": {
    content: BP.manifest,
    filename: "manifest.json",
  },
  "behavior.recipe": {
    content: BP.recipe,
    filename: path.join("recipes", "${{id.safe}}.recipe.json"),
  },
  "behavior.spawn_rule": {
    content: BP.spawn_rule,
    filename: path.join("spawn_rules", "${{id.safe}}.spawn.json"),
  },
  "behavior.trading": {
    content: BP.trading,
    filename: path.join("trading", "${{id.safe}}.trades.json"),
  },
  "behavior.volume": {
    content: BP.volume,
    filename: path.join("volumes", "${{id.safe}}.volume.json"),
  },
  //#endregion

  //#region Resource Pack
  "resource.animation_controller": {
    //  ID = ID.replace("controller.", "");
    // ID = ID.replace("animation.", "");
    content: RP.animation_controller,
    filename: path.join("animation_controllers", "${{id.safe}}.controller.json"),
  },
  "resource.animation": {
    content: RP.animation,
    filename: path.join("animations", "${{id.safe}}.animation.json"),
  },
  "resource.attachable": {
    content: RP.attachable,
    filename: path.join("attachables", "${{id.safe}}.attachable.json"),
  },
  "resource.biomes_client": {
    content: RP.biomes_client,
    filename: "biomes_client.json",
  },
  "resource.blocks": {
    content: RP.blocks,
    filename: "blocks.json",
  },
  "resource.entity": {
    content: RP.entity,
    filename: path.join("entities", "${{id.safe}}.entity.json"),
  },
  "resource.fog": {
    content: RP.fog,
    filename: path.join("fogs", "${{id.safe}}.fog.json"),
  },
  "resource.flipbook_textures": {
    content: RP.flipbook_textures,
    filename: path.join("textures", "flipbook_textures.json"),
  },
  "resource.item_texture": {
    content: RP.item_texture,
    filename: path.join("textures", "item_texture.png"),
  },
  "resource.manifest": {
    content: RP.manifest,
    filename: "manifest.json",
  },
  "resource.model": {
    content: RP.model,
    filename: path.join("models", "entity", "${{id.safe}}.geo.json"),
  },
  "resource.music_definitions": {
    content: RP.music_definitions,
    filename: path.join("sounds", "music_definitions.json"),
  },
  "resource.particle": {
    content: RP.particle,
    filename: path.join("particles", "${{id.safe}}.particle.json"),
  },
  "resource.render_controller": {
    // ID = ID.replace("controller.", "");
    // ID = ID.replace("render.", "");
    content: RP.render_controller,
    filename: path.join("render_controllers", "${{id.safe}}.render.json"),
  },
  "resource.sounds": {
    content: RP.sounds,
    filename: "sounds.json",
  },
  "resource.sound_definitions": {
    content: RP.sound_definitions,
    filename: path.join("sounds", "sound_definitions.json"),
  },
  "resource.terrain_texture": {
    content: RP.terrain_texture,
    filename: path.join("textures", "terrain_texture.json"),
  },
  //#endregion

  //#region World
  "world.manifest": {
    content: WP.manifest,
    filename: "manifest.json",
  },
  //#endregion
};

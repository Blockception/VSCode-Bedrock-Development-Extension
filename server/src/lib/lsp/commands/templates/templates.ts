import { TemplateFallback, TemplateProcessor } from "../../../templates";
import { CommandManager } from "../manager";
import { Commands } from "@blockception/shared";
import { CommandContext } from "../context";
import { Context } from "../../context/context";
import { getFolders } from "./folders";

import * as BPT from "../../../data/templates/behavior-pack";
import * as RPT from "../../../data/templates/resource-pack";
import * as WPT from "../../../data/templates/world";
import path from "path";

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

export function setupTemplates(manager: CommandManager): void {
  const BPC = Commands.Create.Behaviorpack;
  const RPC = Commands.Create.Resourcepack;

  createCommand(
    manager,
    BPC.Animation_Controller,
    BPT.animation_controller,
    "animation_controllers",
    "${{id.safe}}.controller.json"
  );
  createCommand(manager, BPC.Animation, BPT.animation, "animations", "${{id.safe}}.animation..json");
  createCommand(manager, BPC.Block, BPT.block, "blocks", "${{id.safe}}.block..json");
  createCommand(manager, BPC.Entity, BPT.entity, "entities", "${{id.safe}}.entity.bp..json");
  createCommand(manager, BPC.Dialogue, BPT.dialogue, "dialogue", "${{id.safe}}.dialogue..json");
  createCommand(manager, BPC.Item, BPT.item, "items", "${{id.safe}}.item..json");
  createCommand(manager, BPC.Loot_Table, BPT.loot_table, "loot_tables", "${{id.safe}}.loot..json");
  createCommand(manager, BPC.Manifests, BPT.manifest, "manifest..json");
  createCommand(manager, BPC.Recipe, BPT.recipe, "recipes", "${{id.safe}}.recipe..json");
  createCommand(manager, BPC.Spawn_Rule, BPT.spawn_rule, "spawn_rules", "${{id.safe}}.spawn..json");
  createCommand(manager, BPC.Trading, BPT.trading, "trading", "${{id.safe}}.trades..json");
  createCommand(manager, BPC.Volume, BPT.volume, "volumes", "${{id.safe}}.volume..json");

  createCommand(
    manager,
    RPC.Animation_Controller,
    RPT.animation_controller,
    "animation_controllers",
    "${{id.safe}}.controller.json"
  );
  createCommand(manager, RPC.Animation, RPT.animation, "animations", "${{id.safe}}.animation..json");
  createCommand(manager, RPC.Attachable, RPT.attachable, "attachables", "${{id.safe}}.attachable..json");
  createCommand(manager, RPC.Biomes_Client, RPT.biomes_client, "biomes_client..json");
  createCommand(manager, RPC.Blocks, RPT.blocks, "blocks..json");
  createCommand(manager, RPC.BlockCulling, RPT.block_culling, "block_culling", "${{id.safe}}.rule..json");
  createCommand(manager, RPC.Entity, RPT.entity, "entity", "${{id.safe}}.entity.rp..json");
  createCommand(manager, RPC.Fog, RPT.fog, "fogs", "${{id.safe}}.fog..json");
  createCommand(manager, RPC.Flipbook_Textures, RPT.flipbook_textures, "textures", "flipbook_textures..json");
  createCommand(manager, RPC.Item_Texture, RPT.item_texture, "textures", "item_texture.png");
  createCommand(manager, RPC.Manifests, RPT.manifest, "manifest..json");
  createCommand(manager, RPC.Model, RPT.model, "models", "entity", "${{id.safe}}.geo..json");
  createCommand(manager, RPC.Music_Definitions, RPT.music_definitions, "sounds", "music_definitions..json");
  createCommand(manager, RPC.Particle, RPT.particle, "particles", "${{id.safe}}.particle..json");
  createCommand(
    manager,
    RPC.Render_Controller,
    RPT.render_controller,
    "render_controllers",
    "${{id.safe}}.render..json"
  );
  createCommand(manager, RPC.Sounds, RPT.sounds, "sounds..json");
  createCommand(manager, RPC.Sound_Definitions, RPT.sound_definitions, "sounds", "sound_definitions..json");
  createCommand(manager, RPC.Terrain_Texture, RPT.terrain_texture, "textures", "terrain_texture..json");

  createCommand(manager, Commands.Create.World.Manifests, WPT.manifest, "manifest..json");
}

function createCommand(manager: CommandManager, commandId: string, content: string, ...paths: string[]) {
  const templateId = commandId.replace(Commands.Create.Base, "");
  const item = TemplateItem.create(content, ...paths);
  const fallback: TemplateFallback = {
    content: () => item.content,
    filename: () => item.filename,
  };

  manager.add(commandId, async function (context: Context<CommandContext>): Promise<boolean> {
    const folder = getFolders(context).GetFolder(commandId);
    const id = (context.args ? context.args[0] : undefined) || "UNKNOWN";

    const attributes = {
      id,
      templateId,
    };

    const processor = TemplateProcessor.create(context, templateId, folder, attributes, fallback);
    processor.process();

    await processor.createFile();
    return true;
  });
}

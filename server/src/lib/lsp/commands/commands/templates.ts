import { Commands } from "@blockception/shared";

import * as BPT from "../../templates/definitions/behavior-pack";
import * as RPT from "../../templates/definitions/resource-pack";
import * as WPT from "../../templates/definitions/world";

import path from "path";
import { CommandManager } from "../manager";
import { Context } from "../../context/context";
import { CommandContext } from "../context";
import { getFolders } from "../../templates/folders";
import { TemplateProcessor } from "../../../templates/processor";

const BPC = Commands.Create.Behaviorpack;
const RPC = Commands.Create.Resourcepack;

export class TemplateItem {
  private _commandId: string;
  private _content: string;
  private _filename: string;

  constructor(commandId: string, content: string, ...paths: string[]) {
    this._commandId = commandId;
    this._content = content;
    this._filename = paths.length === 1 ? paths[0] : path.join(...paths);
  }

  commandId(): string {
    return this._commandId;
  }

  templateId(): string {
    return this._commandId.replace(Commands.Create.Base, "");
  }

  filename(): string {
    return this._filename;
  }

  content(): string {
    return this._content;
  }

  /**
   *
   * @param context
   * @param folder
   * @param attributes
   * @returns
   */
  async execute(
    context: Context<CommandContext>,
    folder?: string | undefined,
    attributes: Record<string, string> = {}
  ) {
    folder = folder || getFolders(context).GetFolder(this.commandId());
    const processor = TemplateProcessor.create(context, this.templateId(), folder, attributes, this);
    const id = (context.arguments ? context.arguments[0] : undefined) || "UNKNOWN";
    attributes = {
      id,
      templateId: this.templateId(),
      ...attributes,
    };

    processor.process();

    await processor.createFile();
    return true;
  }
}

export const TemplateCommands: TemplateItem[] = [
  new TemplateItem(
    BPC.Animation_Controller,
    BPT.animation_controller,
    "animation_controllers",
    "${{id.safe}}.controller.json"
  ),
  new TemplateItem(BPC.Animation, BPT.animation, "animations", "${{id.safe}}.animation..json"),
  new TemplateItem(BPC.Block, BPT.block, "blocks", "${{id.safe}}.block..json"),
  new TemplateItem(BPC.Entity, BPT.entity, "entities", "${{id.safe}}.entity.bp..json"),
  new TemplateItem(BPC.Dialogue, BPT.dialogue, "dialogue", "${{id.safe}}.dialogue..json"),
  new TemplateItem(BPC.Item, BPT.item, "items", "${{id.safe}}.item..json"),
  new TemplateItem(BPC.Loot_Table, BPT.loot_table, "loot_tables", "${{id.safe}}.loot..json"),
  new TemplateItem(BPC.Manifests, BPT.manifest, "manifest..json"),
  new TemplateItem(BPC.Recipe, BPT.recipe, "recipes", "${{id.safe}}.recipe..json"),
  new TemplateItem(BPC.Spawn_Rule, BPT.spawn_rule, "spawn_rules", "${{id.safe}}.spawn..json"),
  new TemplateItem(BPC.Trading, BPT.trading, "trading", "${{id.safe}}.trades..json"),
  new TemplateItem(BPC.Volume, BPT.volume, "volumes", "${{id.safe}}.volume..json"),
  new TemplateItem(
    RPC.Animation_Controller,
    RPT.animation_controller,
    "animation_controllers",
    "${{id.safe}}.controller.json"
  ),
  new TemplateItem(RPC.Animation, RPT.animation, "animations", "${{id.safe}}.animation..json"),
  new TemplateItem(RPC.Attachable, RPT.attachable, "attachables", "${{id.safe}}.attachable..json"),
  new TemplateItem(RPC.Biomes_Client, RPT.biomes_client, "biomes_client..json"),
  new TemplateItem(RPC.Blocks, RPT.blocks, "blocks..json"),
  new TemplateItem(RPC.BlockCulling, RPT.block_culling, "block_culling", "${{id.safe}}.rule..json"),
  new TemplateItem(RPC.Entity, RPT.entity, "entity", "${{id.safe}}.entity.rp..json"),
  new TemplateItem(RPC.Fog, RPT.fog, "fogs", "${{id.safe}}.fog..json"),
  new TemplateItem(RPC.Flipbook_Textures, RPT.flipbook_textures, "textures", "flipbook_textures..json"),
  new TemplateItem(RPC.Item_Texture, RPT.item_texture, "textures", "item_texture.png"),
  new TemplateItem(RPC.Manifests, RPT.manifest, "manifest..json"),
  new TemplateItem(RPC.Model, RPT.model, "models", "entity", "${{id.safe}}.geo..json"),
  new TemplateItem(RPC.Music_Definitions, RPT.music_definitions, "sounds", "music_definitions..json"),
  new TemplateItem(RPC.Particle, RPT.particle, "particles", "${{id.safe}}.particle..json"),
  new TemplateItem(RPC.Render_Controller, RPT.render_controller, "render_controllers", "${{id.safe}}.render..json"),
  new TemplateItem(RPC.Sounds, RPT.sounds, "sounds..json"),
  new TemplateItem(RPC.Sound_Definitions, RPT.sound_definitions, "sounds", "sound_definitions..json"),
  new TemplateItem(RPC.Terrain_Texture, RPT.terrain_texture, "textures", "terrain_texture..json"),
  new TemplateItem(Commands.Create.World.Manifests, WPT.manifest, "manifest..json"),
];

export function getTemplateCommand(command: string): TemplateItem | undefined {
  for (const v of TemplateCommands) {
    if (v.commandId() === command) {
      return v;
    }
  }

  return undefined;
}

export function setupTemplates(manager: CommandManager): void {
  TemplateCommands.filter((value) => value instanceof TemplateItem).forEach((template) =>
    manager.add(template.commandId(), template.execute.bind(template))
  );
}

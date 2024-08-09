import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { Fs, getDirectory } from "../../util";
import { Kinds } from "../../constants";
import { SymbolBuilder } from "./builder";

export function convertResourcePack(pack: ResourcePack.ResourcePack, builder: SymbolBuilder): void {
  const folder = Fs.FromVscode(pack.folder);
  builder.containerName = getDirectory(folder);

  builder.generate(pack.animations, Kinds.Symbol.Animation);
  builder.generate(pack.animation_controllers, Kinds.Symbol.AnimationControllers);
  builder.generate(pack.attachables, Kinds.Symbol.Item);
  builder.generate(pack.block_culling_rules, Kinds.Symbol.BlockCulling);
  builder.generate(pack.entities, Kinds.Symbol.Entity);
  builder.generate(pack.fogs, Kinds.Symbol.Fogs);
  builder.generate(pack.materials, Kinds.Symbol.Materials);
  builder.generate(pack.models, Kinds.Symbol.Models);
  builder.generate(pack.particles, Kinds.Symbol.Particle);
  builder.generate(pack.render_controllers, Kinds.Symbol.RenderController);
  builder.generate(pack.sounds, Kinds.Symbol.Sound);
  builder.generate(pack.textures, Kinds.Symbol.Texture);
}

export function convertBehaviorPacks(pack: BehaviorPack.BehaviorPack, builder: SymbolBuilder): void {
  const folder = Fs.FromVscode(pack.folder);
  builder.containerName = getDirectory(folder);

  builder.generate(pack.animations, Kinds.Symbol.Animation);
  builder.generate(pack.animation_controllers, Kinds.Symbol.AnimationControllers);
  builder.generate(pack.blocks, Kinds.Symbol.Block);
  builder.generate(pack.entities, Kinds.Symbol.Entity);
  builder.generate(pack.items, Kinds.Symbol.Item);
  builder.generate(pack.loot_tables, Kinds.Symbol.LootTable);
  builder.generate(pack.structures, Kinds.Symbol.Structure);
  builder.generate(pack.trading, Kinds.Symbol.Trading);
}

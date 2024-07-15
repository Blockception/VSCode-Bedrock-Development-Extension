import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { Kinds } from "../../../Minecraft/General";
import { JsonPathCompletion } from '../../builder';
import * as BlockCulling from '../resource-pack/block-culling';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The block definition: ${item.id}`;
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.Block });

  receiver.generate(Database.ProjectData.BehaviorPacks.blocks, generateDoc);
  receiver.generate(MinecraftData.vanilla.BehaviorPack.blocks, generateDoc);

  //Education data
  if (IsEducationEnabled(context.doc)) receiver.generate(MinecraftData.edu.BehaviorPack.blocks, generateDoc);
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return blocksBPJsonCompletion.onCompletion(context);
}

const blocksBPJsonCompletion = new JsonPathCompletion(
  {
    match: "minecraft:block/components/minecraft:geometry/culling",
    onCompletion: BlockCulling.provideCompletion
  }
);
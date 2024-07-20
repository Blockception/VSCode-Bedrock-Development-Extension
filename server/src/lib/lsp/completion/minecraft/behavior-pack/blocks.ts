import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { IsEducationEnabled } from "../../../../project/attributes";
import { JsonPathCompletion } from '../../builder';
import { Kinds } from "../../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import * as BlockCulling from '../resource-pack/block-culling';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The block definition: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });

  builder.generate(Database.ProjectData.BehaviorPacks.blocks, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.blocks, generateDoc);

  //Education data
  if (IsEducationEnabled(context.doc)) builder.generate(MinecraftData.edu.BehaviorPack.blocks, generateDoc);
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
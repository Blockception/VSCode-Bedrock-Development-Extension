import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { IsEducationEnabled } from "../../../../project/attributes";
import { JsonPathCompletion } from "../../builder";
import { Kinds } from "../../../../constants";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

import * as BlockCulling from "../resource-pack/block-culling";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The block definition: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });

  builder.generate(context.database.ProjectData.behaviorPacks.blocks, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.blocks, generateDoc);

  //Education data
  if (IsEducationEnabled(context.document)) builder.generate(MinecraftData.edu.BehaviorPack.blocks, generateDoc);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return blocksBPJsonCompletion.onCompletion(context);
}

const blocksBPJsonCompletion = new JsonPathCompletion({
  match: "minecraft:block/components/minecraft:geometry/culling",
  onCompletion: BlockCulling.provideCompletion,
});

import { CompletionBuilder } from "../../builder/builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The trading table: ${item.id}`;
  const generatesDoc = (item: string) => `The vanilla trading table: ${item}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Trading });

  builder.generate(context.projectData.BehaviorPacks.trading, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.trading, generatesDoc);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    builder.generate(MinecraftData.edu.BehaviorPack.trading, generatesDoc);
  }
}

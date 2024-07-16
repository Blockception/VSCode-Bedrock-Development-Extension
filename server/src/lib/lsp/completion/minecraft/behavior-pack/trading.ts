import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The trading table: ${item.id}`;
  const generatesDoc = (item: string) => `The vanilla trading table: ${item}`;
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.Trading });

  receiver.generate(Database.ProjectData.BehaviorPacks.trading, generateDoc);
  receiver.generate(MinecraftData.vanilla.BehaviorPack.trading, generatesDoc);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    receiver.generate(MinecraftData.edu.BehaviorPack.trading, generatesDoc);
  }
}

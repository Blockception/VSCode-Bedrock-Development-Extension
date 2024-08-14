import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The trading table: ${item.id}`;
  const generatesDoc = (item: string) => `The vanilla trading table: ${item}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Trading });

  builder.generate(context.database.ProjectData.behaviorPacks.trading, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.trading, generatesDoc);

  //Education data
  if (IsEducationEnabled(context.document)) {
    builder.generate(MinecraftData.edu.BehaviorPack.trading, generatesDoc);
  }
}

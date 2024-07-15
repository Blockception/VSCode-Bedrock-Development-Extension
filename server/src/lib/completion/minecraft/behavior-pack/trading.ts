import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../../Minecraft/General/Kinds";

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

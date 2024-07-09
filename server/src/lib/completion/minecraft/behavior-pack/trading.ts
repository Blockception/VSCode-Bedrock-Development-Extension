import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../../Minecraft/General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The trading table: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.trading, generateDoc, Kinds.Completion.Trading);

  const generatesDoc = (item: string) => `The vanilla trading table: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.BehaviorPack.trading, generatesDoc, Kinds.Completion.Trading);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.BehaviorPack.trading, generatesDoc, Kinds.Completion.Trading);
}

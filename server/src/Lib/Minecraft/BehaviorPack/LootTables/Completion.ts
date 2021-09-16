import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The loot table definition: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.loot_tables, generateDoc, Kinds.Completion.LootTable);

  const generatesDoc = (item: string) => `The vanilla loot table definition: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.BehaviorPack.loot_tables, generatesDoc, Kinds.Completion.LootTable);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.BehaviorPack.loot_tables, generatesDoc, Kinds.Completion.LootTable);
}

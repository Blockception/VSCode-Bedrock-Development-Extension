import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The item definition: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.items, generateDoc, Kinds.Completion.Item);

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.Generate(MinecraftData.edu.BehaviorPack.items, generateDoc, Kinds.Completion.Item);
}

import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The entity definition: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.entities, generateDoc, Kinds.Completion.Entity);

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.BehaviorPack.entities, generateDoc, Kinds.Completion.Entity);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.Generate(MinecraftData.edu.BehaviorPack.entities, generateDoc, Kinds.Completion.Entity);
}


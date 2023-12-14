import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp entity: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.entities, generateDoc, Kinds.Completion.Entity);

  //Generate for vanilla data
  const generateV = (item: Identifiable) => `The vanilla rp entity: ${item.id}`;

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.ResourcePack.entities, generateV, Kinds.Completion.Entity);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.Generate(MinecraftData.edu.ResourcePack.entities, generateV, Kinds.Completion.Entity);
}

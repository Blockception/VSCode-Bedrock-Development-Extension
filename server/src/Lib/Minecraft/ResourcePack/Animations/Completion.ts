import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp animation: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.animations, generateDoc, Kinds.Completion.Animation);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla rp animation: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.ResourcePack.animations, generateV, Kinds.Completion.Animation);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.ResourcePack.animations, generateV, Kinds.Completion.Animation);
}

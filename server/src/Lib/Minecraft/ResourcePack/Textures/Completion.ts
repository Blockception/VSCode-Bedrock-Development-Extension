import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { Database } from "../../../Database/Database";
import { Kinds } from "../../General/Kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../Project/Attributes";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The texture: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.textures, generateDoc, Kinds.Completion.Texture);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla texture: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.ResourcePack.textures, generateV, Kinds.Completion.Texture);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.ResourcePack.textures, generateV, Kinds.Completion.Texture);
}

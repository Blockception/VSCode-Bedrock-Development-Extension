import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../builder/builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Database } from "../../../database/database";
import { Kinds } from "../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../project/Attributes";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The texture: ${item.id}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.textures, generateDoc, Kinds.Completion.Texture);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla texture: ${item}`;

  //Vanilla data
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.textures, generateV, Kinds.Completion.Texture);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.ResourcePack.textures, generateV, Kinds.Completion.Texture);
}

import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The material: ${item.id}`;
  const generateV = (item: string) => `The vanilla material: ${item}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.materials, generateDoc, Kinds.Completion.Materials);
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.materials, generateV, Kinds.Completion.Materials);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.ResourcePack.materials, generateV, Kinds.Completion.Materials);
}

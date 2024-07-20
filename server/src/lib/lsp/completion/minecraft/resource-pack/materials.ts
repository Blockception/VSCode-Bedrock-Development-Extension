import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The material: ${item.id}`;
  const generateV = (item: string) => `The vanilla material: ${item}`;

  context.builder.generate(context.projectData.ResourcePacks.materials, generateDoc, Kinds.Completion.Materials);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.materials, generateV, Kinds.Completion.Materials);

  //Education data
  if (IsEducationEnabled(context.doc)) context.builder.generate(MinecraftData.edu.ResourcePack.materials, generateV, Kinds.Completion.Materials);
}

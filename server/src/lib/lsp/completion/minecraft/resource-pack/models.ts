import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The model: ${item.id}`;
  const generateV = (item: Identifiable) => `The vanilla model: ${item}`;

  context.builder.generate(context.projectData.ResourcePacks.models, generateDoc, Kinds.Completion.Models);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.models, generateV, Kinds.Completion.Models);

  //Education data
  if (IsEducationEnabled(context.doc))
    context.builder.generate(MinecraftData.edu.ResourcePack.models, generateV, Kinds.Completion.Models);
}

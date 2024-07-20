import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../../builder/builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../../project/attributes";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The texture: ${item.id}`;
  const generateV = (item: string) => `The vanilla texture: ${item}`;

  context.builder.generate(context.projectData.ResourcePacks.textures, generateDoc, Kinds.Completion.Texture);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.textures, generateV, Kinds.Completion.Texture);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    context.builder.generate(MinecraftData.edu.ResourcePack.textures, generateV, Kinds.Completion.Texture);
  }
}

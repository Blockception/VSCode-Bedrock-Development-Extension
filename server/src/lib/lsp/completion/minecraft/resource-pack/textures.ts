import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The texture: ${item.id}`;
  const generateV = (item: string) => `The vanilla texture: ${item}`;

  context.builder.generate(context.database.ProjectData.resourcePacks.textures, generateDoc, Kinds.Completion.Texture);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.textures, generateV, Kinds.Completion.Texture);

  //Education data
  if (IsEducationEnabled(context.document)) {
    context.builder.generate(MinecraftData.edu.ResourcePack.textures, generateV, Kinds.Completion.Texture);
  }
}


import { CompletionBuilder } from "../../builder/builder";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants/kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { IsEducationEnabled } from "../../../../project/attributes";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';

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

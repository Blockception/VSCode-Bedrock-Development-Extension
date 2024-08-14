import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The model: ${item.id}`;
  const generateV = (item: Identifiable) => `The vanilla model: ${item}`;

  context.builder.generate(context.database.ProjectData.resourcePacks.models, generateDoc, Kinds.Completion.Models);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.models, generateV, Kinds.Completion.Models);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.models, generateV, Kinds.Completion.Models);
}

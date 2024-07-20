import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The model: ${item.id}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.models, generateDoc, Kinds.Completion.Models);

  //Generate for vanilla data
  const generateV = (item: Identifiable) => `The vanilla model: ${item}`;

  //Vanilla data
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.models, generateV, Kinds.Completion.Models);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.ResourcePack.models, generateV, Kinds.Completion.Models);
}

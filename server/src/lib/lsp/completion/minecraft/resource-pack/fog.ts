import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The fog: ${item.id}`;

  context.builder.generate(Database.ProjectData.ResourcePacks.fogs, generateDoc, Kinds.Completion.Fogs);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla fog: ${item}`;

  //Vanilla data
  context.builder.generate(MinecraftData.vanilla.ResourcePack.fogs, generateV, Kinds.Completion.Fogs);

  //Education data
  if (IsEducationEnabled(context.doc)) context.builder.generate(MinecraftData.edu.ResourcePack.fogs, generateV, Kinds.Completion.Fogs);
}

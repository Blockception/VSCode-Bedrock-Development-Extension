import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../database/database";
import { IsEducationEnabled } from "../../../project/Attributes";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The render controller: ${item.id}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.render_controllers, generateDoc, Kinds.Completion.RenderController);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla render controller: ${item}`;

  //Vanilla data
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.render_controllers, generateV, Kinds.Completion.RenderController);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.ResourcePack.render_controllers, generateV, Kinds.Completion.RenderController);
}

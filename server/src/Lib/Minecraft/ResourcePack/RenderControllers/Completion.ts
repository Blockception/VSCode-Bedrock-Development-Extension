import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The render controller: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.render_controllers, generateDoc, Kinds.Completion.RenderController);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla render controller: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.ResourcePack.render_controllers, generateV, Kinds.Completion.RenderController);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.ResourcePack.render_controllers, generateV, Kinds.Completion.RenderController);
}

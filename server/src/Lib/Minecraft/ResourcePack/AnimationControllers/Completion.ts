import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from '../../../Project/Attributes';
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp animation controller: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.animation_controllers, generateDoc, Kinds.Completion.AnimationControllers);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla rp animation controller: ${item}`;

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.vanilla.ResourcePack.animation_controllers, generateV, Kinds.Completion.AnimationControllers);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.GenerateStr(MinecraftData.edu.ResourcePack.animation_controllers, generateV, Kinds.Completion.AnimationControllers);
}

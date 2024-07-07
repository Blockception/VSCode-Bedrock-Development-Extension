import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/builder/builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from '../../../Project/Attributes';
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp animation controller: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.animation_controllers, generateDoc, Kinds.Completion.AnimationControllers);

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc, Kinds.Completion.AnimationControllers);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.Generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc, Kinds.Completion.AnimationControllers);
}

import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { Kinds } from '../../../Minecraft/General';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The block definition: ${item.id}`;

  context.receiver.generate(Database.ProjectData.BehaviorPacks.blocks, generateDoc, Kinds.Completion.Block);

  //Vanilla data
  context.receiver.generate(MinecraftData.vanilla.BehaviorPack.blocks, generateDoc, Kinds.Completion.Block);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.BehaviorPack.blocks, generateDoc, Kinds.Completion.Block);
}

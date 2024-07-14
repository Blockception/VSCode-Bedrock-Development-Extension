import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../../Minecraft/General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp animation: ${item.id}`;
  const receiver = context.receiver;

  receiver.generate(Database.ProjectData.ResourcePacks.animations, generateDoc, Kinds.Completion.Animation);
  receiver.generate(Database.ProjectData.ResourcePacks.animation_controllers, generateDoc, Kinds.Completion.Animation);

  Database.ProjectData.ResourcePacks.entities.forEach((entity) => {
    receiver.generate(entity.animations.defined, (item) => `The entity animation: ${item}`, Kinds.Completion.Animation);
  });

  //Vanilla data
  receiver.generate(MinecraftData.vanilla.ResourcePack.animations, generateDoc, Kinds.Completion.Animation);
  receiver.generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc, Kinds.Completion.Animation);
  MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
    receiver.generate(entity.animations, (item) => `The vanilla entity animation: ${item}`, Kinds.Completion.Animation);
  });

  //Education data
  if (IsEducationEnabled(context.doc)) {
    receiver.generate(MinecraftData.edu.ResourcePack.animations, generateDoc, Kinds.Completion.Animation);
    receiver.generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc, Kinds.Completion.Animation);
    MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
      receiver.generate(entity.animations, (item) => `The edu entity animation: ${item}`, Kinds.Completion.Animation);
    });
  }
}

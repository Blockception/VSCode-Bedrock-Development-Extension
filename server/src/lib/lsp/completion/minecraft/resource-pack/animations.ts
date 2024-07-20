import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from "../../builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp animation: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  builder.generate(Database.ProjectData.ResourcePacks.animations, generateDoc);
  builder.generate(Database.ProjectData.ResourcePacks.animation_controllers, generateDoc);

  Database.ProjectData.ResourcePacks.entities.forEach((entity) => {
    builder.generate(entity.animations.defined, (item) => `The entity animation: ${item}`);
  });

  //Vanilla data
  builder.generate(MinecraftData.vanilla.ResourcePack.animations, generateDoc);
  builder.generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc);
  MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
    builder.generate(entity.animations, (item) => `The vanilla entity animation: ${item}`);
  });

  //Education data
  if (IsEducationEnabled(context.doc)) {
    builder.generate(MinecraftData.edu.ResourcePack.animations, generateDoc);
    builder.generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc);
    MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
      builder.generate(entity.animations, (item) => `The edu entity animation: ${item}`);
    });
  }
}

export function provideDefinedAnimationCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  Database.ProjectData.ResourcePacks.entities.forEach((entity) => {
    builder.generate(entity.animations.defined, () => `Animation defined by ${entity.id}`);
  });
  MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
    builder.generate(entity.animations, () => `Animation defined by ${entity.id}`);
  });

  //Education data
  if (IsEducationEnabled(context.doc)) {
    MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
      builder.generate(entity.animations, () => `Animation defined by ${entity.id}`);
    });
  }
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return animRPJsonCompletion.onCompletion(context);
}

const animRPJsonCompletion = new JsonPathCompletion();

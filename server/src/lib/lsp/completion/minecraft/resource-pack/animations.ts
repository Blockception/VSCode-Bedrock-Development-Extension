import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from "../../builder";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The rp animation: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  builder.generate(context.database.ProjectData.resourcePacks.animations, generateDoc);
  builder.generate(context.database.ProjectData.resourcePacks.animation_controllers, generateDoc);

  context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
    builder.generate(entity.animations.defined, (item) => `The entity animation: ${item}`);
  });

  //Vanilla data
  builder.generate(MinecraftData.vanilla.ResourcePack.animations, generateDoc);
  builder.generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc);
  MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
    builder.generate(entity.animations, (item) => `The vanilla entity animation: ${item}`);
  });

  //Education data
  if (IsEducationEnabled(context.document)) {
    builder.generate(MinecraftData.edu.ResourcePack.animations, generateDoc);
    builder.generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc);
    MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
      builder.generate(entity.animations, (item) => `The edu entity animation: ${item}`);
    });
  }
}

export function provideDefinedAnimationCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
    builder.generate(entity.animations.defined, () => `Animation defined by ${entity.id}`);
  });
  MinecraftData.vanilla.ResourcePack.entities.forEach((entity) => {
    builder.generate(entity.animations, () => `Animation defined by ${entity.id}`);
  });

  //Education data
  if (IsEducationEnabled(context.document)) {
    MinecraftData.edu.ResourcePack.entities.forEach((entity) => {
      builder.generate(entity.animations, () => `Animation defined by ${entity.id}`);
    });
  }
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return animRPJsonCompletion.onCompletion(context);
}

const animRPJsonCompletion = new JsonPathCompletion();

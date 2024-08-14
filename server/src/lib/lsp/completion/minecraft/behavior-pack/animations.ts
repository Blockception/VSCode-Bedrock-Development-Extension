import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants";
import { Context } from "../../../context/context";
import { JsonPathCompletion } from "../../builder";
import { CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The bp animation: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  builder.generate(context.database.ProjectData.behaviorPacks.animations, generateDoc);
}

export function provideDefinedAnimationCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  context.database.ProjectData.behaviorPacks.entities.forEach((item) => {
    builder.generate(item.animations.defined, (anim) => `Animation defined by ${item.id}`);
  });
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return animBPJsonCompletion.onCompletion(context);
}

const animBPJsonCompletion = new JsonPathCompletion();

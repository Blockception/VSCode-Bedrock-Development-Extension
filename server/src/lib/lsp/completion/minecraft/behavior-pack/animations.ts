import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { JsonPathCompletion } from "../../builder";
import { Kinds } from "../../../../constants/kinds";
import { SimpleContext } from "../../../../util/simple-context";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The bp animation: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  builder.generate(Database.ProjectData.BehaviorPacks.animations, generateDoc);
}

export function provideDefinedAnimationCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  Database.ProjectData.BehaviorPacks.entities.forEach((item) => {
    builder.generate(item.animations.defined, (anim) => `Animation defined by ${item.id}`);
  });
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return animBPJsonCompletion.onCompletion(context);
}

const animBPJsonCompletion = new JsonPathCompletion();

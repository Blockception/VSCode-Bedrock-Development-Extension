import { Kinds } from "../../../../constants";
import { Context } from "../../../context/context";
import { JsonPathCompletion } from "../../builder";
import { CompletionContext } from "../../context";

import * as Animations from "./animations";

export function provideCompletion(context: Context<CompletionContext>): void {
  context.builder.generate(
    context.database.ProjectData.behaviorPacks.animation_controllers,
    (item) => `The bp animation controller: ${item.id}`,
    Kinds.Completion.AnimationControllers
  );
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return acBPJsonCompletion.onCompletion(context);
}

const acBPJsonCompletion = new JsonPathCompletion({
  match: /animation_controllers\/(.*)\/states\/(.*)\/animations\/.*/gi,
  onCompletion: Animations.provideDefinedAnimationCompletion,
});

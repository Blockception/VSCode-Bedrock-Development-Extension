import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../database/database";
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from '../../builder';
import * as Animations from './animations';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.generate(
    Database.ProjectData.BehaviorPacks.animation_controllers, 
    (item: Identifiable) => `The bp animation controller: ${item.id}`, 
    Kinds.Completion.AnimationControllers);
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return acBPJsonCompletion.onCompletion(context);
}

const acBPJsonCompletion = new JsonPathCompletion(
  {
    match: /animation_controllers\/(.*)\/states\/(.*)\/animations\/.*/gi,
    onCompletion: Animations.provideDefinedAnimationCompletion,
  }
);
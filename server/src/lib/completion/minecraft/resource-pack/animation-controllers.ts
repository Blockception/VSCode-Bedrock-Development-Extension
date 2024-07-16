import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../database/database";
import { IsEducationEnabled } from '../../../project/Attributes';
import { Kinds } from "../../../constants/kinds";
import { JsonPathCompletion } from '../../builder';

import * as Animations from './animations';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp animation controller: ${item.id}`;
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.AnimationControllers });

  receiver.generate(Database.ProjectData.ResourcePacks.animation_controllers, generateDoc);
  receiver.generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc);

  //Education data
  if (IsEducationEnabled(context.doc)) receiver.generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc);
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return acRPJsonCompletion.onCompletion(context);
}

const acRPJsonCompletion = new JsonPathCompletion(
  {
    match: /animation_controllers\/(.*)\/states\/(.*)\/animations\/.*/gi,
    onCompletion: Animations.provideCompletion,
  }
);


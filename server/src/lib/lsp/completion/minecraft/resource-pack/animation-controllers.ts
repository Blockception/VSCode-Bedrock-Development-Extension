import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from '../../../../project/attributes';
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from '../../builder';

import * as Animations from './animations';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The rp animation controller: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.AnimationControllers });

  builder.generate(context.database.ProjectData.resourcePacks.animation_controllers, generateDoc);
  builder.generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc);

  //Education data
  if (IsEducationEnabled(context.document)) builder.generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return acRPJsonCompletion.onCompletion(context);
}

const acRPJsonCompletion = new JsonPathCompletion(
  {
    match: /animation_controllers\/(.*)\/states\/(.*)\/animations\/\d+$/gi,
    onCompletion: Animations.provideCompletion,
  }
);


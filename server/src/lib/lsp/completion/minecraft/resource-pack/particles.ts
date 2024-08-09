import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants";
import { JsonPathCompletion } from '../../builder';

import * as Textures from './textures';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The particle: ${item.id}`;
  const generateV = (item: string) => `The vanilla particle: ${item}`;

  context.builder.generate(context.database.ProjectData.resourcePacks.particles, generateDoc, Kinds.Completion.Particle);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.particles, generateV, Kinds.Completion.Particle);

  //Education data
  if (IsEducationEnabled(context.document)) context.builder.generate(MinecraftData.edu.ResourcePack.particles, generateV, Kinds.Completion.Particle);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return particleJsonCompletion.onCompletion(context);
}

const particleJsonCompletion = new JsonPathCompletion(
  {
    match: (item) => item.endsWith("/basic_render_parameters/texture"),
    onCompletion: Textures.provideCompletion
  }
);
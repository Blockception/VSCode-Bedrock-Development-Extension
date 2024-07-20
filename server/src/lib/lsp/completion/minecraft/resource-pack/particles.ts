import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from '../../builder';

import * as Textures from './textures';

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The particle: ${item.id}`;
  const generateV = (item: string) => `The vanilla particle: ${item}`;

  context.builder.generate(context.projectData.ResourcePacks.particles, generateDoc, Kinds.Completion.Particle);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.particles, generateV, Kinds.Completion.Particle);

  //Education data
  if (IsEducationEnabled(context.doc)) context.builder.generate(MinecraftData.edu.ResourcePack.particles, generateV, Kinds.Completion.Particle);
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return particleJsonCompletion.onCompletion(context);
}

const particleJsonCompletion = new JsonPathCompletion(
  {
    match: (item) => item.endsWith("/basic_render_parameters/texture"),
    onCompletion: Textures.provideCompletion
  }
);
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from '../../../context/context';
import { JsonPathCompletion } from "../../builder";
import { CompletionContext } from '../../context';

import * as Molang from "../molang";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The render controller: ${item.id}`;
  const generateV = (item: string) => `The vanilla render controller: ${item}`;

  context.builder.generate(
    context.database.ProjectData.resourcePacks.render_controllers,
    generateDoc,
    Kinds.Completion.RenderController
  );
  context.builder.generate(
    MinecraftData.vanilla.ResourcePack.render_controllers,
    generateV,
    Kinds.Completion.RenderController
  );

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(
      MinecraftData.edu.ResourcePack.render_controllers,
      generateV,
      Kinds.Completion.RenderController
    );
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return jsonRenderController.onCompletion(context);
}

const jsonRenderController = new JsonPathCompletion(
  {
    match: (path) => path.endsWith("geometry"),
    onCompletion: (c) => Molang.Geometry.provideResourcePackCompletion(c, true),
  },
  {
    match: /\/material\/(\d+)/,
    onCompletion: (c) => Molang.Material.provideResourcePackCompletion(c, true),
  },
  {
    match: /\/textures\/(\d+)/,
    onCompletion: Molang.Texture.provideCompletion,
  }
);

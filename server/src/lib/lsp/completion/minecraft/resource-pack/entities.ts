import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants";
import { JsonPathCompletion } from "../../builder/json-path";
import { Material } from "../molang";

import * as Animations from "./animations";
import * as AnimationControllers from "./animation-controllers";
import * as Models from "./models";
import * as RenderControllers from "./render-controllers";
import * as Textures from "./textures";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The rp entity: ${item.id}`;
  const generateV = (item: Identifiable) => `The vanilla rp entity: ${item.id}`;

  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Entity });

  builder.generate(context.database.ProjectData.resourcePacks.entities, generateDoc);
  builder.generate(MinecraftData.vanilla.ResourcePack.entities, generateV);

  //Education data
  if (IsEducationEnabled(context.document)) {
    builder.generate(MinecraftData.edu.ResourcePack.entities, generateV);
  }
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return entityRpJsonCompletion.onCompletion(context);
}

const entityRpJsonCompletion = new JsonPathCompletion(
  {
    match: (path) => path.includes("minecraft:client_entity/description/animations/"),
    onCompletion: (c) => {
      Animations.provideCompletion(c);
      AnimationControllers.provideCompletion(c);
    },
  },
  {
    match: (path) => path.includes("minecraft:client_entity/description/materials/"),
    onCompletion: Material.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:client_entity/description/animation_controllers/"),
    onCompletion: AnimationControllers.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:client_entity/description/geometry/"),
    onCompletion: Models.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:client_entity/description/render_controllers/"),
    onCompletion: RenderControllers.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:client_entity/description/textures/"),
    onCompletion: Textures.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:client_entity/description/scripts/animate/"),
    onCompletion: (context: Context<CompletionContext>) => {
      const data = context.database.ProjectData.resourcePacks.entities.find((entity) => entity.location.uri === context.document.uri);
      if (data === undefined) return;

      context.builder.generate(
        data.animations.defined,
        (item) => `The rp entity animation: ${item}`,
        Kinds.Completion.Animation
      );
    },
  }
);

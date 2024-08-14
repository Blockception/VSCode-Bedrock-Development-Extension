import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants";
import { Context } from '../../../context/context';
import { JsonPathCompletion } from "../../builder";
import { CompletionContext } from '../../context';
import { Material } from "../molang";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Models from "./models";
import * as RenderControllers from "./render-controllers";
import * as Textures from "./textures";

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The attachbles: ${item.id}`;

  context.builder.generate(context.database.ProjectData.resourcePacks.attachables, generateDoc, Kinds.Completion.Item);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return attachableRpJsonCompletion.onCompletion(context);
}

const attachableRpJsonCompletion = new JsonPathCompletion(
  {
    match: (path) => path.includes("minecraft:attachable/description/animations/"),
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
    match: (path) => path.includes("minecraft:attachable/description/animation_controllers/"),
    onCompletion: AnimationControllers.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:attachable/description/geometry/"),
    onCompletion: Models.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:attachable/description/render_controllers/"),
    onCompletion: RenderControllers.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:attachable/description/textures/"),
    onCompletion: Textures.provideCompletion,
  },
  {
    match: (path) => path.includes("minecraft:attachable/description/scripts/animate/"),
    onCompletion: (context: Context<CompletionContext>) => {
      const data = context.database.ProjectData.resourcePacks.attachables.find(
        (attachable) => attachable.location.uri === context.document.uri
      );
      if (data === undefined) return;

      context.builder.generate(
        data.animations.defined,
        (item) => `The rp entity animation: ${item}`,
        Kinds.Completion.Animation
      );
    },
  }
);

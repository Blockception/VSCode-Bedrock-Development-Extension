import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from "../../builder";

import * as Animations from "./animations";
import * as AnimationControllers from "./animation-controllers";
import * as Models from "./models";
import * as RenderControllers from "./render-controllers";
import * as Textures from "./textures";
import { Material } from "../molang";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The attachbles: ${item.id}`;

  context.builder.generate(context.projectData.ResourcePacks.attachables, generateDoc, Kinds.Completion.Item);
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
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
    onCompletion: (context: SimpleContext<CompletionBuilder>) => {
      const data = context.projectData.ResourcePacks.attachables.find(
        (attachable) => attachable.location.uri === context.doc.uri
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

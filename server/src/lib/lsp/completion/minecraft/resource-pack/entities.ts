import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";
import { JsonPathCompletion } from "../../builder/json-path";

import * as Animations from "./animations";
import * as AnimationControllers from "./animation-controllers";
import * as Models from "./models";
import * as RenderControllers from "./render-controllers";
import * as Textures from "./textures";
import { Material } from "../molang";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp entity: ${item.id}`;
  const generateV = (item: Identifiable) => `The vanilla rp entity: ${item.id}`;

  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Entity });

  builder.generate(context.projectData.ResourcePacks.entities, generateDoc);
  builder.generate(MinecraftData.vanilla.ResourcePack.entities, generateV);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    builder.generate(MinecraftData.edu.ResourcePack.entities, generateV);
  }
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
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
    onCompletion: (context: SimpleContext<CompletionBuilder>) => {
      const data = context.projectData.ResourcePacks.entities.find((entity) => entity.location.uri === context.doc.uri);
      if (data === undefined) return;

      context.builder.generate(
        data.animations.defined,
        (item) => `The rp entity animation: ${item}`,
        Kinds.Completion.Animation
      );
    },
  }
);

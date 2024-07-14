import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../../Minecraft/General/Kinds";
import { JsonPathCompletion } from "../../builder/json-path";

import * as Animations from "./animations";
import * as AnimationControllers from "./animation-controllers";
import * as Models from "./models";
import * as RenderControllers from "./render-controllers";
import * as Textures from "./textures";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp entity: ${item.id}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.entities, generateDoc, Kinds.Completion.Entity);

  //Generate for vanilla data
  const generateV = (item: Identifiable) => `The vanilla rp entity: ${item.id}`;

  //Vanilla data
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.entities, generateV, Kinds.Completion.Entity);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    context.receiver.generate(MinecraftData.edu.ResourcePack.entities, generateV, Kinds.Completion.Entity);
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
  }
);

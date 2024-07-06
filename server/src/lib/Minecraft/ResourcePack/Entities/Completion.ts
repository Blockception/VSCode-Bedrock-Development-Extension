import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";
import { JsonPathCompletion } from "../../../Completion/JsonPath";

import * as Animations from "../Animations/Completion";
import * as AnimationControllers from "../AnimationControllers/Completion";
import * as Models from "../Models/Completion";
import * as RenderControllers from "../RenderControllers/Completion";
import * as Textures from "../Textures/Completion";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The rp entity: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.entities, generateDoc, Kinds.Completion.Entity);

  //Generate for vanilla data
  const generateV = (item: Identifiable) => `The vanilla rp entity: ${item.id}`;

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.ResourcePack.entities, generateV, Kinds.Completion.Entity);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    context.receiver.Generate(MinecraftData.edu.ResourcePack.entities, generateV, Kinds.Completion.Entity);
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
    }
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

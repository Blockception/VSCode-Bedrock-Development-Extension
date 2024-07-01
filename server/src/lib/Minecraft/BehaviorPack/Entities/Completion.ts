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
import * as LootTables from "../LootTables/Completion";
import * as Item from "../Items/Completion";
import * as Trading from "../Trading/Completion";
import * as Sounds from "../../ResourcePack/Sounds/Completion";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The entity definition: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.entities, generateDoc, Kinds.Completion.Entity);

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.BehaviorPack.entities, generateDoc, Kinds.Completion.Entity);

  //Education data
  if (IsEducationEnabled(context.doc)) {
    context.receiver.Generate(MinecraftData.edu.BehaviorPack.entities, generateDoc, Kinds.Completion.Entity);
  }
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>) {
  return entityJsonCompletion.onCompletion(context);
}

const entityJsonCompletion = new JsonPathCompletion(
  {
    match: "throw_sound",
    onCompletion: Sounds.provideCompletion,
  },
  {
    match: "minecraft:ambient_sound_interval/event_name",
    onCompletion: Sounds.provideCompletion,
  },
  {
    match: "minecraft:loot/table",
    onCompletion: LootTables.provideCompletion,
  },
  {
    match: "minecraft:trade_table/table",
    onCompletion: Trading.provideCompletion,
  },
  {
    match: "item",
    onCompletion: Item.provideCompletion,
  },

  {
    match: (path) => path.includes("minecraft:entity/description/animations/"),
    onCompletion: (c) => {
      Animations.provideCompletion(c);
      AnimationControllers.provideCompletion(c);
    }
  }
);

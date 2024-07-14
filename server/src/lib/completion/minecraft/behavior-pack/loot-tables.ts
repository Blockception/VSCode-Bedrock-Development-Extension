import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { JsonCompletionContext } from "../../builder/context";
import { Kinds } from "../../../Minecraft/General/Kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";

import * as Items from "./items";

export function provideJsonCompletion(context: JsonCompletionContext): void {
  const property = JsonCompletionContext.getProperty(context);
  if (property === undefined) return;

  switch (property) {
    case "name":
      return Items.provideCompletion(context);
  }
}

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  generate_items(context);
}

export function provideShortCompletion(context: SimpleContext<CompletionBuilder>): void {
  const ncontext = {
    ...context,
    receiver: context.receiver.withEvents((item) => {
      let id = short_id(item.label);
      item.insertText = id;
    }),
  };

  generate_items(ncontext);
}

function generate_items(context: SimpleContext<CompletionBuilder>) {
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.LootTable });

  const generateDoc = (item: Identifiable) => `The loot table definition: ${item.id}`;
  const generatesDoc = (item: string) => `The vanilla loot table definition: ${item}`;

  receiver.generate(Database.ProjectData.BehaviorPacks.loot_tables, generateDoc);
  receiver.generate(MinecraftData.vanilla.BehaviorPack.loot_tables, generatesDoc);

  //Education data
  if (IsEducationEnabled(context.doc))
    receiver.generate(MinecraftData.edu.BehaviorPack.loot_tables, generatesDoc);
}

function short_id(id: string): string {
  if (id.startsWith("loot_tables/")) {
    id = id.slice(12);
  }
  if (id.endsWith(".json")) {
    id = id.slice(0, -5);
  }

  if (id.includes("/") || id.includes("\\")) {
    id = '"' + id + '"';
  }

  return id;
}

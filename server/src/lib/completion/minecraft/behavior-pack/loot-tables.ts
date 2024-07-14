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
  const cancelFn = context.receiver.onNewItem((item, next) => {
    let id = short_id(item.label);
    item.insertText = id;

    next(item);
  });

  generate_items(context);
  cancelFn();
}

function generate_items(context: SimpleContext<CompletionBuilder>) {
  const generateDoc = (item: Identifiable) => `The loot table definition: ${item.id}`;

  context.receiver.generate(Database.ProjectData.BehaviorPacks.loot_tables, generateDoc, Kinds.Completion.LootTable);

  const generatesDoc = (item: string) => `The vanilla loot table definition: ${item}`;

  //Vanilla data
  context.receiver.generate(
    MinecraftData.vanilla.BehaviorPack.loot_tables,
    generatesDoc,
    Kinds.Completion.LootTable
  );

  //Education data
  if (IsEducationEnabled(context.doc))
    context.receiver.generate(MinecraftData.edu.BehaviorPack.loot_tables, generatesDoc, Kinds.Completion.LootTable);
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

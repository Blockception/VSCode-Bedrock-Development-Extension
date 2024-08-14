import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from "../../../context/context";
import { CompletionContext, JsonCompletionContext } from "../../context";

import * as Items from "./items";

export function provideJsonCompletion(context: Context<JsonCompletionContext>): void {
  const property = JsonCompletionContext.getProperty(context);
  if (property === undefined) return;

  switch (property) {
    case "name":
      return Items.provideCompletion(context);
  }
}

export function provideCompletion(context: Context<CompletionContext>): void {
  generate_items(context);
}

export function provideShortCompletion(context: Context<CompletionContext>): void {
  const ncontext = {
    ...context,
    builder: context.builder.withEvents((item) => (item.insertText = short_id(item.label))),
  };

  generate_items(ncontext);
}

function generate_items(context: Context<CompletionContext>) {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.LootTable });

  const generateDoc = (item: Identifiable) => `The loot table definition: ${item.id}`;
  const generatesDoc = (item: string) => `The vanilla loot table definition: ${item}`;

  builder.generate(context.database.ProjectData.behaviorPacks.loot_tables, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.loot_tables, generatesDoc);

  //Education data
  if (IsEducationEnabled(context.document)) builder.generate(MinecraftData.edu.BehaviorPack.loot_tables, generatesDoc);
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

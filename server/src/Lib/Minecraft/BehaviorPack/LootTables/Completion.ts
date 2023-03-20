import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  generate_items(context);
}

export function ProvideShortCompletion(context: SimpleContext<CompletionBuilder>): void {
  generate_items(context, (id) => {
    //Remove loot_tables/
    if (id.startsWith("loot_tables/")) {
      id = id.substring(12);
    }

    //Remove .json
    if (id.endsWith(".json")) {
      id = id.substring(0, id.length - 5);
    }

    if (id.includes('/') || id.includes('\\')) {
      id = '"' + id + '"';
    }

    return id;
  });
}

function generate_items(context: SimpleContext<CompletionBuilder>, additional?: (id: string) => string) {
  let transform_id = additional ?? ((x) => x);

  const generateDoc = (item: Identifiable) => `The loot table definition: ${transform_id(item.id)}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.loot_tables, generateDoc, Kinds.Completion.LootTable);

  const generatesDoc = (item: string) => `The vanilla loot table definition: ${transform_id(item)}`;

  //Vanilla data
  context.receiver.GenerateStr(
    MinecraftData.vanilla.BehaviorPack.loot_tables,
    generatesDoc,
    Kinds.Completion.LootTable
  );

  //Education data
  if (IsEducationEnabled(context.doc))
    context.receiver.GenerateStr(MinecraftData.edu.BehaviorPack.loot_tables, generatesDoc, Kinds.Completion.LootTable);
}

import { Documentated } from "bc-minecraft-bedrock-types/lib/src/Types/Documentated";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { Position } from "vscode-languageserver-textdocument";
import { CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { SimpleContext } from "../../Code/include";
import { CompletionBuilder } from "../../Completion/Builder";
import { Database } from "../../Database/include";
import { Boolean } from "../General/include";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>, pos: Position) {
  const filename = path.basename(context.doc.uri);

  switch (filename) {
    case MCAttributes.filename:
      ProvideAttributes(context, pos);
      break;
    case MCDefinition.filename:
      ProvideDefinitions(context, pos);
      break;
    case MCIgnore.filename:
      break;
  }
}

/**
 *
 * @param context
 * @param pos
 * @returns
 */
function ProvideAttributes(context: SimpleContext<CompletionBuilder>, pos: Position) {
  const builder = context.receiver;
  const line = context.doc.getLine(pos.line);

  const index = line.indexOf("=");
  if (index > -1 && index < pos.character) {
    Boolean.ProvideCompletion(builder);
    return;
  }

  builder.Add("## ", "Comment", CompletionItemKind.Snippet);
  builder.Add("education.enable", "Disable or enable education edition for this project", CompletionItemKind.Property, "education.enable=");
  builder.Add("diagnostic.enable", "Disable or enable diagnostics for this project", CompletionItemKind.Property, "diagnostic.enable=");
  builder.Add("diagnostic.json", "Disable or enable diagnostics for json in this project", CompletionItemKind.Property, "diagnostic.json=");
  builder.Add("diagnostic.lang", "Disable or enable diagnostics for language in this project", CompletionItemKind.Property, "diagnostic.lang=");
  builder.Add(
    "diagnostic.mcfunction",
    "Disable or enable diagnostics for mcfunction in this project",
    CompletionItemKind.Property,
    "diagnostic.mcfunction="
  );
  builder.Add(
    "diagnostic.objective",
    "Disable or enable diagnostics for objectives in this project",
    CompletionItemKind.Property,
    "diagnostic.objective="
  );
  builder.Add("diagnostic.tag", "Disable or enable diagnostics for tags in this project", CompletionItemKind.Property, "diagnostic.tag=");
}

/**
 *
 * @param context
 * @param pos
 * @returns
 */
function ProvideDefinitions(context: SimpleContext<CompletionBuilder>, pos: Position): void {
  const line = context.doc.getLine(pos.line);

  const index = line.indexOf("=");
  if (index > -1 && index < pos.character) {
    const definition = line.substring(0, index);

    switch (definition) {
      case "block":
        return Database.ProjectData.BehaviorPacks.blocks.forEach((block) => Add(context, block));

      case "entity":
        return Database.ProjectData.BehaviorPacks.entities.forEach((entity) => Add(context, entity));

      case "family":
        return Database.ProjectData.BehaviorPacks.entities.forEach((entity) => entity.families.forEach((family) => Add(context, family)));

      case "function":
        return Database.ProjectData.BehaviorPacks.functions.forEach((funct) => Add(context, funct));

      case "item":
        return Database.ProjectData.BehaviorPacks.items.forEach((item) => Add(context, item));

      case "loot_table":
        return Database.ProjectData.BehaviorPacks.loot_tables.forEach((loot_table) => Add(context, loot_table));

      case "name":
        return Database.ProjectData.General.fakeEntities.forEach((entity) => Add(context, entity));

      case "objective":
        return Database.ProjectData.General.objectives.forEach((obj) => Add(context, obj));

      case "structure":
        return Database.ProjectData.BehaviorPacks.structures.forEach((structure) => Add(context, structure));

      case "tag":
        return Database.ProjectData.General.tags.forEach((tag) => Add(context, tag));

      case "tickingarea":
        return Database.ProjectData.General.tickingAreas.forEach((tickingarea) => Add(context, tickingarea));
    }

    return;
  }

  const builder = context.receiver;
  builder.Add("## ", "Comment", CompletionItemKind.Snippet);
  builder.Add("block", "Include or excluded a block definition", CompletionItemKind.Property, "block=");
  builder.Add("entity", "Include or excluded a entity definition", CompletionItemKind.Property, "entity=");
  builder.Add("family", "Include or excluded a family definition", CompletionItemKind.Property, "family=");
  builder.Add("function", "Include or excluded a function definition", CompletionItemKind.Property, "function=");
  builder.Add("item", "Include or excluded a item definition", CompletionItemKind.Property, "item=");
  builder.Add("loot_table", "Include or excluded a loot_table definition", CompletionItemKind.Property, "loot_table=");
  builder.Add("name", "Include or excluded a name definition", CompletionItemKind.Property, "name=");
  builder.Add("objective", "Include or excluded a objective definition", CompletionItemKind.Property, "objective=");
  builder.Add("structure", "Include or excluded a structure definition", CompletionItemKind.Property, "structure=");
  builder.Add("tag", "Include or excluded a tag definition", CompletionItemKind.Property, "tag=");
  builder.Add("tickingarea", "Include or excluded a tickingarea definition", CompletionItemKind.Property, "tickingarea=");
}

function Add(context: SimpleContext<CompletionBuilder>, value: (Identifiable & Documentated) | string) {
  let label: string;
  let documentation: MarkupContent = { kind: "markdown", value: "" };

  if (typeof value === "string") {
    label = value;
    documentation.value = value;
  } else {
    label = value.id;
    documentation.value = value.documentation ?? "";
  }

  context.receiver.Add(label, documentation, CompletionItemKind.Value).sortText = label;
  context.receiver.Add("!" + label, documentation, CompletionItemKind.Value).sortText = label + "2";
}

import { Boolean } from "../../general";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { Database } from "../../../Database/Database";
import { Documentated } from "bc-minecraft-bedrock-types/lib/src/types/documentated";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import { Position } from "vscode-languageserver-textdocument";
import { SimpleContext } from "../../../Code";

import path from "path";
import { TemplateFilenames } from "../../../Commands/Templates/Templates";

export function provideCompletion(context: SimpleContext<CompletionBuilder>, pos: Position) {
  const filename = path.basename(context.doc.uri);

  switch (filename) {
    case MCAttributes.filename:
      provideAttributes(context, pos);
      break;
    case MCDefinition.filename:
      provideDefinitions(context, pos);
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
function provideAttributes(context: SimpleContext<CompletionBuilder>, pos: Position) {
  const builder = context.receiver;
  const line = context.doc.getLine(pos.line);

  const index = line.indexOf("=");
  if (index > -1 && index < pos.character) {
    Boolean.provideCompletion(builder);
    return;
  }

  builder.add("## ", "Comment", CompletionItemKind.Snippet);
  builder.add(
    "education.enable",
    "Disable or enable education edition for this project",
    CompletionItemKind.Property,
    "education.enable="
  );
  builder.add(
    "diagnostic.enable",
    "Disable or enable diagnostics for this project",
    CompletionItemKind.Property,
    "diagnostic.enable="
  );
  builder.add(
    "diagnostic.json",
    "Disable or enable diagnostics for json in this project",
    CompletionItemKind.Property,
    "diagnostic.json="
  );
  builder.add(
    "diagnostic.lang",
    "Disable or enable diagnostics for language in this project",
    CompletionItemKind.Property,
    "diagnostic.lang="
  );
  builder.add(
    "diagnostic.mcfunction",
    "Disable or enable diagnostics for mcfunction in this project",
    CompletionItemKind.Property,
    "diagnostic.mcfunction="
  );
  builder.add(
    "diagnostic.objective",
    "Disable or enable diagnostics for objectives in this project",
    CompletionItemKind.Property,
    "diagnostic.objective="
  );
  builder.add(
    "diagnostic.tag",
    "Disable or enable diagnostics for tags in this project",
    CompletionItemKind.Property,
    "diagnostic.tag="
  );

  const templates = Object.getOwnPropertyNames(TemplateFilenames);
  templates.forEach((temp) => {
    temp = temp.replace("-", ".");
    builder.add(
      `template.${temp}.filename`,
      "The filename of the template",
      CompletionItemKind.Property,
      `template.${temp}.filename=`
    );
    builder.add(
      `template.${temp}.file`,
      "The file of the content of the file",
      CompletionItemKind.File,
      `template.${temp}.file=`
    );
  });
}

/**
 *
 * @param context
 * @param pos
 * @returns
 */
function provideDefinitions(context: SimpleContext<CompletionBuilder>, pos: Position): void {
  const line = context.doc.getLine(pos.line);

  const index = line.indexOf("=");
  if (index > -1 && index < pos.character) {
    const definition = line.substring(0, index);

    switch (definition) {
      case "block":
        return Database.ProjectData.BehaviorPacks.blocks.forEach((block) => add(context, block));

      case "entity":
        return Database.ProjectData.BehaviorPacks.entities.forEach((entity) => add(context, entity));

      case "family":
        return Database.ProjectData.BehaviorPacks.entities.forEach((entity) =>
          entity.families.forEach((family) => add(context, family))
        );

      case "function":
        return Database.ProjectData.BehaviorPacks.functions.forEach((funct) => add(context, funct));

      case "item":
        return Database.ProjectData.BehaviorPacks.items.forEach((item) => add(context, item));

      case "loot_table":
        return Database.ProjectData.BehaviorPacks.loot_tables.forEach((loot_table) => add(context, loot_table));

      case "name":
        return Database.ProjectData.General.fakeEntities.forEach((entity) => add(context, entity));

      case "objective":
        return Database.ProjectData.General.objectives.forEach((obj) => add(context, obj));

      case "structure":
        return Database.ProjectData.BehaviorPacks.structures.forEach((structure) => add(context, structure));

      case "tag":
        return Database.ProjectData.General.tags.forEach((tag) => add(context, tag));

      case "tickingarea":
        return Database.ProjectData.General.tickingAreas.forEach((tickingarea) => add(context, tickingarea));
    }

    return;
  }

  const builder = context.receiver;
  builder.add("## ", "Comment", CompletionItemKind.Snippet);
  builder.add("block", "Include or excluded a block definition", CompletionItemKind.Property, "block=");
  builder.add("entity", "Include or excluded a entity definition", CompletionItemKind.Property, "entity=");
  builder.add("family", "Include or excluded a family definition", CompletionItemKind.Property, "family=");
  builder.add("function", "Include or excluded a function definition", CompletionItemKind.Property, "function=");
  builder.add("item", "Include or excluded a item definition", CompletionItemKind.Property, "item=");
  builder.add("loot_table", "Include or excluded a loot_table definition", CompletionItemKind.Property, "loot_table=");
  builder.add("name", "Include or excluded a name definition", CompletionItemKind.Property, "name=");
  builder.add("objective", "Include or excluded a objective definition", CompletionItemKind.Property, "objective=");
  builder.add("structure", "Include or excluded a structure definition", CompletionItemKind.Property, "structure=");
  builder.add("tag", "Include or excluded a tag definition", CompletionItemKind.Property, "tag=");
  builder.add(
    "tickingarea",
    "Include or excluded a tickingarea definition",
    CompletionItemKind.Property,
    "tickingarea="
  );
}

function add(context: SimpleContext<CompletionBuilder>, value: (Identifiable & Documentated) | string) {
  let label: string;
  let documentation: MarkupContent = { kind: "markdown", value: "" };

  if (typeof value === "string") {
    label = value;
    documentation.value = value;
  } else {
    label = value.id;
    documentation.value = value.documentation ?? "";
  }

  context.receiver.add(label, documentation, CompletionItemKind.Value).sortText = label;
  context.receiver.add("!" + label, documentation, CompletionItemKind.Value).sortText = label + "2";
}

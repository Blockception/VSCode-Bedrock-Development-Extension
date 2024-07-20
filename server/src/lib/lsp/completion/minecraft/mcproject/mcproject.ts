import { Boolean } from "../../general";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { Database } from "../../../../lsp/database/database";
import { Documentated } from "bc-minecraft-bedrock-types/lib/src/types/documentated";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import { Position } from "vscode-languageserver-textdocument";
import { SimpleContext } from "../../../../util";
import { TemplateFilenames } from '../../../commands/templates/templates';

import path from "path";

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
    Boolean.provideCompletion(context);
    return;
  }

  builder.add({ label: "## ", documentation: "Comment", kind: CompletionItemKind.Snippet });
  builder.add({
    label: "education.enable",
    documentation: "Disable or enable education edition for this project",
    kind: CompletionItemKind.Property,
    insertText: "education.enable=",
  });
  builder.add({
    label: "diagnostic.enable",
    documentation: "Disable or enable diagnostics for this project",
    kind: CompletionItemKind.Property,
    insertText: "diagnostic.enable=",
  });
  builder.add({
    label: "diagnostic.json",
    documentation: "Disable or enable diagnostics for json in this project",
    kind: CompletionItemKind.Property,
    insertText: "diagnostic.json=",
  });
  builder.add({
    label: "diagnostic.lang",
    documentation: "Disable or enable diagnostics for language in this project",
    kind: CompletionItemKind.Property,
    insertText: "diagnostic.lang=",
  });
  builder.add({
    label: "diagnostic.mcfunction",
    documentation: "Disable or enable diagnostics for mcfunction in this project",
    kind: CompletionItemKind.Property,
    insertText: "diagnostic.mcfunction=",
  });
  builder.add({
    label: "diagnostic.objective",
    documentation: "Disable or enable diagnostics for objectives in this project",
    kind: CompletionItemKind.Property,
    insertText: "diagnostic.objective=",
  });
  builder.add({
    label: "diagnostic.tag",
    documentation: "Disable or enable diagnostics for tags in this project",
    kind: CompletionItemKind.Property,
    insertText: "diagnostic.tag=",
  });

  const templates = Object.getOwnPropertyNames(TemplateFilenames);
  templates.forEach((temp) => {
    temp = temp.replace("-", ".");
    builder.add({
      label: `template.${temp}.filename`,
      documentation: "The filename of the template",
      kind: CompletionItemKind.Property,
      insertText: `template.${temp}.filename=`,
    });
    builder.add({
      label: `template.${temp}.file`,
      documentation: "The file of the content of the file",
      kind: CompletionItemKind.File,
      insertText: `template.${temp}.file=`,
    });
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
  builder.add({ label: "## ", documentation: "Comment", kind: CompletionItemKind.Snippet });
  builder.add({
    label: "block",
    documentation: "Include or excluded a block definition",
    kind: CompletionItemKind.Property,
    insertText: "block=",
  });
  builder.add({
    label: "entity",
    documentation: "Include or excluded a entity definition",
    kind: CompletionItemKind.Property,
    insertText: "entity=",
  });
  builder.add({
    label: "family",
    documentation: "Include or excluded a family definition",
    kind: CompletionItemKind.Property,
    insertText: "family=",
  });
  builder.add({
    label: "function",
    documentation: "Include or excluded a function definition",
    kind: CompletionItemKind.Property,
    insertText: "function=",
  });
  builder.add({
    label: "item",
    documentation: "Include or excluded a item definition",
    kind: CompletionItemKind.Property,
    insertText: "item=",
  });
  builder.add({
    label: "loot_table",
    documentation: "Include or excluded a loot_table definition",
    kind: CompletionItemKind.Property,
    insertText: "loot_table=",
  });
  builder.add({
    label: "name",
    documentation: "Include or excluded a name definition",
    kind: CompletionItemKind.Property,
    insertText: "name=",
  });
  builder.add({
    label: "objective",
    documentation: "Include or excluded a objective definition",
    kind: CompletionItemKind.Property,
    insertText: "objective=",
  });
  builder.add({
    label: "structure",
    documentation: "Include or excluded a structure definition",
    kind: CompletionItemKind.Property,
    insertText: "structure=",
  });
  builder.add({
    label: "tag",
    documentation: "Include or excluded a tag definition",
    kind: CompletionItemKind.Property,
    insertText: "tag=",
  });
  builder.add({
    label: "tickingarea",
    documentation: "Include or excluded a tickingarea definition",
    kind: CompletionItemKind.Property,
    insertText: "tickingarea=",
  });
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

  context.receiver.add({ label: label, documentation, kind: CompletionItemKind.Value }).sortText = label;
  context.receiver.add({ label: "!" + label, documentation, kind: CompletionItemKind.Value }).sortText = `${label}2`;
}

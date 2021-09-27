import { Documentated } from "bc-minecraft-bedrock-types/lib/src/Types/Documentated";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { Position } from "vscode-languageserver-textdocument";
import { CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { SimpleContext } from "../../Code/include";
import { CompletionBuilder } from "../../Completion/Builder";
import { Database } from "../../Database/include";
import { TextDocument } from "../../Types/Document/TextDocument";
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
  builder.Add("diagnostic.mcfunction", "Disable or enable diagnostics for mcfunction in this project", CompletionItemKind.Property, "diagnostic.mcfunction=");
  builder.Add("diagnostic.objective", "Disable or enable diagnostics for objectives in this project", CompletionItemKind.Property, "diagnostic.objective=");
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
      case "name":
        return;

      case "objective":
        return Database.ProjectData.General.objectives.forEach((tag) => Add(context, tag));

      case "tag":
        return Database.ProjectData.General.tags.forEach((tag) => Add(context, tag));

      case "family":
        return Database.ProjectData.BehaviorPacks.entities.forEach((entity) => entity.families.forEach((family) => Add(context, family)));
    }

    return;
  }

  const builder = context.receiver;
  builder.Add("## ", "Comment", CompletionItemKind.Snippet);
  builder.Add("tag", "Include or excluded a tag definition", CompletionItemKind.Property, "tag=");
  builder.Add("family", "Include or excluded a family definition", CompletionItemKind.Property, "family=");
  builder.Add("name", "Include or excluded a name definition", CompletionItemKind.Property, "name=");
  builder.Add("objective", "Include or excluded a objective definition", CompletionItemKind.Property, "objective=");
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

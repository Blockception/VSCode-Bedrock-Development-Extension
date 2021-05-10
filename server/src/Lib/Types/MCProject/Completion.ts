import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { Position } from "vscode-languageserver-textdocument";
import { CompletionItemKind, MarkupContent } from "vscode-languageserver-types";
import { CompletionBuilder } from "../../Completion/Builder";
import { Database } from "../../include";
import { TextDocument } from "../Document/TextDocument";
import { Boolean } from "../General/include";
import { Documentable } from "../Minecraft/Interfaces/Documentable";
import { Identifiable } from "../Minecraft/Interfaces/Identifiable";

export function OnCompletionMCProject(doc: TextDocument, pos: Position, builder: CompletionBuilder) {
  const filename = path.basename(doc.uri);

  switch (filename) {
    case MCAttributes.filename:
      ProvideAttributes(doc, pos, builder);
      break;
    case MCDefinition.filename:
      ProvideDefinitions(doc, pos, builder);
      break;
    case MCIgnore.filename:
      break;
  }
}

function ProvideAttributes(doc: TextDocument, pos: Position, builder: CompletionBuilder) {
  const line = doc.getLine(pos.line);

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

function ProvideDefinitions(doc: TextDocument, pos: Position, builder: CompletionBuilder): void {
  const line = doc.getLine(pos.line);

  const index = line.indexOf("=");
  if (index > -1 && index < pos.character) {
    const definition = line.substring(0, index);

    switch (definition) {
      case "name":
        return;

      case "objective":
        return Database.Database.Data.General.Objectives.ForEach((tag) => Add(builder, tag));

      case "tag":
        return Database.Database.Data.General.Tag.ForEach((tag) => Add(builder, tag));

      case "family":
        return Database.Database.Data.General.Entities.ForEach((entity) => entity.Families.forEach((family) => Add(builder, family)));
    }

    return;
  }

  builder.Add("## ", "Comment", CompletionItemKind.Snippet);
  builder.Add("tag", "Include or excluded a tag definition", CompletionItemKind.Property, "tag=");
  builder.Add("family", "Include or excluded a family definition", CompletionItemKind.Property, "family=");
  builder.Add("name", "Include or excluded a name definition", CompletionItemKind.Property, "name=");
  builder.Add("objective", "Include or excluded a objective definition", CompletionItemKind.Property, "objective=");
}

function Add(builder: CompletionBuilder, value: (Identifiable & Documentable) | string) {
  let label: string;
  let documentation: MarkupContent;

  if (typeof value === "string") {
    label = value;
    documentation = { kind: "plaintext", value: "" };
  } else {
    label = value.Identifier;
    documentation = value.Documentation;
  }

  builder.Add(label, documentation, CompletionItemKind.Value).sortText = label;
  builder.Add("!" + label, documentation, CompletionItemKind.Value).sortText = label + "2";
}

import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { Position } from "vscode-languageserver-textdocument";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionBuilder } from "../../Completion/Builder";
import { TextDocument } from "../Document/TextDocument";
import { Boolean } from "../General/include";

export function OnCompletionMCProject(doc: TextDocument, pos: Position, builder: CompletionBuilder) {
  const filename = path.basename(doc.uri);

  switch (filename) {
    case MCDefinition.filename:
      break;
    case MCIgnore.filename:
      break;
    case MCAttributes.filename:
      ProvideAttributes(doc, pos, builder);
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

  builder.Add("education.enable", "Disable or enable education edition for this project", CompletionItemKind.Property, "education.enable=");
  builder.Add("diagnostic.enable", "Disable or enable diagnostics for this project", CompletionItemKind.Property, "diagnostic.enable=");
  builder.Add("diagnostic.json", "Disable or enable diagnostics for json in this project", CompletionItemKind.Property, "diagnostic.json=");
  builder.Add("diagnostic.lang", "Disable or enable diagnostics for language in this project", CompletionItemKind.Property, "diagnostic.lang=");
  builder.Add("diagnostic.mcfunction", "Disable or enable diagnostics for mcfunction in this project", CompletionItemKind.Property, "diagnostic.mcfunction=");
  builder.Add("diagnostic.objective", "Disable or enable diagnostics for objectives in this project", CompletionItemKind.Property, "diagnostic.objective=");
  builder.Add("diagnostic.tag", "Disable or enable diagnostics for tags in this project", CompletionItemKind.Property, "diagnostic.tag=");
}

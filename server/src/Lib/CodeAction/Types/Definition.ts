import { MCDefinition } from "bc-minecraft-project";
import path from "path";
import { CodeAction, Command, Diagnostic } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { Commands } from "../..//Constants";
import { Database } from "../../Database/Database";
import { GetDocument } from "../../Types/Document/include";
import { CodeActionBuilder } from "../Builder";

/**
 *
 * @param builder
 * @param diag
 * @param type
 */
export function Definition(builder: CodeActionBuilder, diag: Diagnostic, type: string): void {
  const doc = GetDocument(builder.params.textDocument.uri);
  if (!doc) return;

  const value = doc.getText(diag.range);
  const ws = Database.WorkspaceData.getFolder(doc.uri);

  if (!ws) {
    console.error(`Couldn't find workspace for: ${doc.uri}`);
    return;
  }

  const uri = URI.file(path.join(ws, MCDefinition.filename)).toString();

  const Command: Command = {
    title: `Add ${value} as ${type} to MCDefintions`,
    command: Commands.Files.Append,
    arguments: [uri, `${type}=${value}`],
  };

  const action: CodeAction = {
    title: Command.title,
    command: Command,
    diagnostics: [diag],
    kind: "quickfix",
  };

  builder.Push(action);
}

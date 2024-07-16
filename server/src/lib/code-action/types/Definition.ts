import { Commands } from '@blockception/shared';
import { MCAttributes, MCDefinition } from "bc-minecraft-project";
import { CodeAction, CodeActionKind, Command, Diagnostic } from "vscode-languageserver";
import { Vscode } from "../../Code/Url";
import { Database } from "../../database/database";
import { Console } from "../../manager/console";
import { GetDocument } from "../../types/Document/Document";
import { CodeActionBuilder } from "../builder";

/**Adds a given type and value to the definition
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
    Console.Error(`Couldn't find workspace for: ${doc.uri}`);
    return;
  }

  const uri = Vscode.join(ws, MCDefinition.filename);

  const Command: Command = {
    title: `Add ${value} as ${type} to MCDefinitions`,
    command: Commands.Files.Append,
    arguments: [uri, `${type}=${value}`],
  };

  const action: CodeAction = {
    title: Command.title,
    command: Command,
    diagnostics: [diag],
    kind: CodeActionKind.QuickFix,
  };

  builder.Push(action);
}

/**Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
export function Attributes(builder: CodeActionBuilder, diag: Diagnostic): void {
  const doc = GetDocument(builder.params.textDocument.uri);
  if (!doc) return;

  const ws = Database.WorkspaceData.getFolder(doc.uri);
  const key = diag.code ?? "";

  if (typeof key === "undefined") return;

  if (!ws) {
    Console.Error(`Couldn't find workspace for: ${doc.uri}`);
    return;
  }

  const uri = Vscode.join(ws, MCAttributes.filename);

  const Command: Command = {
    title: `Disable diagnostic code in project: ${key}`,
    command: Commands.Files.Append,
    arguments: [uri, `diagnostic.disable.${key}=true`],
  };

  const action: CodeAction = {
    title: Command.title,
    command: Command,
    diagnostics: [diag],
    kind: CodeActionKind.QuickFix,
  };

  builder.Push(action);
}

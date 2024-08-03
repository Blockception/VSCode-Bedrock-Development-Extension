import { Commands } from "@blockception/shared";
import { MCAttributes, MCDefinition } from "bc-minecraft-project";
import { CodeAction, CodeActionKind, Command, Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../builder";
import { readDocument } from "../../documents/io";
import { Database } from "../../../lsp/database/database";
import { Console } from "../../../manager";
import { Vscode } from "../../../util";

/**
 * Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
export function Definition(builder: CodeActionBuilder, diag: Diagnostic, type: string): void {
  const document = builder.context.document;
  if (!document) return;

  const value = document.getText(diag.range);
  const ws = builder.context.database.WorkspaceData.getFolder(document.uri);

  if (!ws) {
    Console.Error(`Couldn't find workspace for: ${document.uri}`);
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
export function attributes(builder: CodeActionBuilder, diag: Diagnostic): void {
  const document = builder.context.document;
  if (!document) return;

  const ws = builder.context.database.WorkspaceData.getFolder(document.uri);
  const key = diag.code ?? "";

  if (typeof key === "undefined") return;

  if (!ws) {
    Console.Error(`Couldn't find workspace for: ${document.uri}`);
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

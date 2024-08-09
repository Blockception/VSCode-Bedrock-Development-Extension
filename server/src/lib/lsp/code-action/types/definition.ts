import { Commands } from "@blockception/shared";
import { MCAttributes, MCDefinition } from "bc-minecraft-project";
import { CodeAction, CodeActionKind, Command, Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../builder";
import { Vscode } from "../../../util";

/**
 * Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
export function definition(builder: CodeActionBuilder, diag: Diagnostic, type: string): void {
  const document = builder.context.document;
  const value = document.getText(diag.range);
  const ws = builder.context.database.WorkspaceData.getFolder(document.uri);

  if (!ws) {
    builder.context.logger.error(`Couldn't find workspace for: ${document.uri}`);
    return;
  }

  const uri = Vscode.join(ws, MCDefinition.filename);

  const command: Command = {
    title: `Add ${value} as ${type} to MCDefinitions`,
    command: Commands.Files.Append,
    arguments: [uri, `${type}=${value}`],
  };

  const action: CodeAction = {
    title: command.title,
    command: command,
    diagnostics: [diag],
    kind: CodeActionKind.QuickFix,
    isPreferred: false,
  };

  builder.push(action);
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

  if (typeof key === "undefined" || key === "") return;

  if (!ws) {
    builder.context.logger.error(`Couldn't find workspace for: ${document.uri}`);
    return;
  }

  const uri = Vscode.join(ws, MCAttributes.filename);

  const command: Command = {
    title: `Disable diagnostic code in project: ${key}`,
    command: Commands.Files.Append,
    arguments: [uri, `diagnostic.disable.${key}=true`],
  };

  const action: CodeAction = {
    title: command.title,
    command: command,
    diagnostics: [diag],
    kind: CodeActionKind.QuickFix,
    isPreferred: false,
  };

  builder.push(action);
}

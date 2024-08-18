import { commands, ExtensionContext, window } from "vscode";
import { ExecuteCommandParams, ExecuteCommandRequest } from "vscode-languageclient";
import { Commands } from "@blockception/shared";
import { Manager } from "../manager/manager";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.AddLanguageFile, addAll));
}

function addAll(): any {
  const ed = window.activeTextEditor;

  if (!ed) return;
  const current = ed.document.uri.path;
  const params: ExecuteCommandParams = {
    command: Commands.AddLanguageFile,
    arguments: [current],
  };

  return Manager.Client.sendRequest(ExecuteCommandRequest.type, params);
}

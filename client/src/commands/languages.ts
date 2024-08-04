import { commands, ExtensionContext, window } from "vscode";
import { ExecuteCommandParams, ExecuteCommandRequest } from "vscode-languageclient";
import { Commands } from "@blockception/shared";
import { Manager } from "../manager/manager";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.AddLanguageFile, addAll));
}

function addAll(args: any): any {
  const ed = window.activeTextEditor;

  if (!ed) return;
  const Current = ed.document.uri.path;
  const Params: ExecuteCommandParams = {
    command: Commands.AddLanguageFile,
    args: [Current],
  };

  return Manager.Client.sendRequest(ExecuteCommandRequest.type, Params);
}

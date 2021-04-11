import { commands, ExtensionContext, window } from "vscode";
import { ExecuteCommandParams, ExecuteCommandRequest } from "vscode-languageclient";
import { Commands } from "../../Constants";
import { Manager } from "../../Manager/Manager";

export function Activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.AddLanguageFile, AddAll));
}

function AddAll(args: any): any {
  let Current = window.activeTextEditor.document.uri.path;
  let Params: ExecuteCommandParams = {
    command: Commands.AddLanguageFile,
    arguments: [Current],
  };

  return Manager.Client.sendRequest(ExecuteCommandRequest.type, Params);
}

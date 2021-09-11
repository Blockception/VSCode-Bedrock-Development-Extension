import { WorkspaceFolder } from "vscode-languageserver-protocol";
import { Console } from "../Console/Console";
import { Manager } from "./Manager";

/**
 *
 * @returns
 */
export function GetWorkspaces(): Promise<WorkspaceFolder[]> {
  Console.Info("retrieving workspaces");
  const p = Manager.Connection.workspace.getWorkspaceFolders();

  p.catch((reason) => {
    Console.Error(`problem retrieving workspaces: ${JSON.stringify(reason)}`);
  });

  return p.then((ws) => {
    if (ws === null) ws = [];

    return ws;
  });
}

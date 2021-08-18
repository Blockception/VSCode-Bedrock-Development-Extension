import { WorkspaceFolder } from "vscode-languageserver";

export function ProcessWorkspace(ws: WorkspaceFolder): void {
  const WS = Manager.Connection.workspace.getWorkspaceFolders();

  WS.catch((item) => Console.Error(`No workspaces folders received: ${JSON.stringify(item)}`));

  return WS.then((x) => Traverse(x));
}

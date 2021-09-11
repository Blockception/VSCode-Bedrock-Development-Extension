import { WorkspaceFoldersChangeEvent } from "vscode-languageserver";
import { Console } from "../../../Console/Console";
import { Database } from "../../../Database/Database";
import { ProcessWorkspace } from "../../../Process/Workspace";

export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    OnWorkspaceFolderChange(params);
    resolve();
  });
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  const removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    const ws = removed[index];

    Console.Log("Deleting data from workspace: " + ws.name);
    Database.ProjectData.deleteFolder(ws.uri);
    Database.WorkspaceData.Remove(ws);
  }

  //Call to process workspaces
  params.added.forEach((ws) => ProcessWorkspace(ws));
}

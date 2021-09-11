import { WorkspaceFoldersChangeEvent } from "vscode-languageserver";
import { Console } from "../../../Console/Console";
import { Database } from "../../../Database/Database";
import { Workspace } from "../../../include";

export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    OnWorkspaceFolderChange(params);
    resolve();
  });
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  const removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    Workspace.Workspace.RemoveWorkspace(removed[index].uri);
  }

  //Call to process workspaces
  Workspace.Workspace.TraverseWorkspaces(params.added);
}

import { WorkspaceFoldersChangeEvent } from "vscode-languageserver";
import { Workspace } from "../../../Workspace/index";

export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    OnWorkspaceFolderChange(params);
    resolve();
  });
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  const removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    Workspace.RemoveWorkspace(removed[index].uri);
  }

  //Call to process workspaces
  Workspace.TraverseWorkspaces(params.added);
}

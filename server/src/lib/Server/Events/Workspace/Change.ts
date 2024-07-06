import { WorkspaceFoldersChangeEvent } from "vscode-languageserver";
import { Console } from "../../../Manager";
import { Workspace } from "../../../Workspace";

export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return Console.request("Workspace Folder Changed", Promise.resolve(OnWorkspaceFolderChange(params)));
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  const removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    Workspace.RemoveWorkspace(removed[index].uri);
  }

  //Call to process workspaces
  Workspace.TraverseWorkspaces(params.added);
}

import { WorkspaceFoldersChangeEvent } from "vscode-languageserver";
import { UniformUrl } from "../../../Code/Url";
import { Console } from "../../../Console/Console";
import { Database } from "../../../Database/Database";
import { Traverse } from "../../../Process/Traverse/Traverse";

export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    OnWorkspaceFolderChange(params);
    resolve();
  });
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  let removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    let ws = removed[index];
    let uri = ws.uri;
    uri = UniformUrl(uri);

    Console.Log("Deleting data from workspace: " + ws.name);
    Database.ProjectData.;
    Database.WorkspaceData.Remove(ws);
  }

  //Call to process workspaces
  Database.WorkspaceData.Add(params.added).then(() => {
    Traverse();
  });
}

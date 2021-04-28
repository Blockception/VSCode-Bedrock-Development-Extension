import { WorkspaceFoldersChangeEvent } from "vscode-languageserver";
import { UniformUrl } from "../../../Code/Url";
import { Console } from "../../../Console/Console";
import { Database } from "../../../Database/Database";
import { Traverse } from "../../../Process/Traverse";

export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    OnWorkspaceFolderChange(params);
    resolve();
  });
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  let removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    let uri = removed[index].uri;
    uri = UniformUrl(uri);

    Console.Log("Deleting data from workspace: " + removed[index].name);
    Database.Data.DeleteFolder(uri);
  }

  let added = params.added;

  for (let index = 0; index < added.length; index++) {
    const element = added[index];

    Console.Log("Processing data from added workspace: " + element.name);
  }

  Traverse();
}

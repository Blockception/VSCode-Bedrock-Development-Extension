import { DeleteFilesParams, Diagnostic, FileDelete } from "vscode-languageserver";
import { Database } from "../../../Database/Database";
import { Manager } from '../../../Manager/Manager';

//Files created
export async function onDidDeleteFilesAsync(params: DeleteFilesParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let Promises = onDidDeleteFiles(params);

    return Promise.all(Promises);
  });
}

function onDidDeleteFiles(params: DeleteFilesParams): Promise<void>[] {
  let files = params.files;

  let Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(onDidDeleteFile(files[I]));
  }

  return Promises;
}

async function onDidDeleteFile(Item: FileDelete): Promise<void> {
  return new Promise((resolve, reject) => {
    const uri = Item.uri;
    Database.ProjectData.deleteFile(uri);
    //Reset any diagnostics on the file
    Manager.Diagnostic.ResetDocument(Item.uri);
    resolve();
  });
}

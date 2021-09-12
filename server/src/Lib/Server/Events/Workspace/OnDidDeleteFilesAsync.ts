import { DeleteFilesParams, FileDelete } from "vscode-languageserver";
import { GetFilepath, UniformUrl } from "../../../Code/include";
import { Database } from "../../../Database/Database";

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
    const uri = GetFilepath(UniformUrl(Item.uri));
    Database.ProjectData.deleteFile(uri);
    resolve();
  });
}

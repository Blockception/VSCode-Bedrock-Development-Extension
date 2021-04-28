import { DeleteFilesParams, FileDelete } from "vscode-languageserver";
import { GetFilepath, UniformUrl } from "../../../Code/include";
import { Database } from "../../../Database/Database";

//Files created
export async function OnDidDeleteFilesAsync(params: DeleteFilesParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let Promises = OnDidDeleteFiles(params);

    return Promise.all(Promises);
  });
}

function OnDidDeleteFiles(params: DeleteFilesParams): Promise<void>[] {
  let files = params.files;

  let Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(OnDidDeleteFile(files[I]));
  }

  return Promises;
}

async function OnDidDeleteFile(Item: FileDelete): Promise<void> {
  return new Promise((resolve, reject) => {
    const uri = GetFilepath(UniformUrl(Item.uri));
    Database.Data.DeleteFile(uri);
    resolve();
  });
}

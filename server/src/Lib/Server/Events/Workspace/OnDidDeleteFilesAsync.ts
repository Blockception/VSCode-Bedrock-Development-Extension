import {.deleteFilesParams, FileDelete } from "vscode-languageserver";
import { GetFilepath, UniformUrl } from "../../../Code/include";
import { Database } from "../../../Database/Database";

//Files created
export async function OnDi.deleteFilesAsync(params:.deleteFilesParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let Promises = OnDi.deleteFiles(params);

    return Promise.all(Promises);
  });
}

function OnDi.deleteFiles(params:.deleteFilesParams): Promise<void>[] {
  let files = params.files;

  let Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(OnDi.deleteFile(files[I]));
  }

  return Promises;
}

async function OnDi.deleteFile(Item: FileDelete): Promise<void> {
  return new Promise((resolve, reject) => {
    const uri = GetFilepath(UniformUrl(Item.uri));
    Database.ProjectData.deleteFile(uri);
    resolve();
  });
}

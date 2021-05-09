import { CreateFilesParams, FileCreate } from "vscode-languageserver";
import { GetDocument } from "../../../Types/Document/Document";
import { Process } from "../../../Process/Process";

//Files created
export async function OnDidCreateFilesAsync(params: CreateFilesParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let Promises = OnDidCreateFiles(params);

    return Promise.all(Promises);
  });
}

function OnDidCreateFiles(params: CreateFilesParams): Promise<void>[] {
  let files = params.files;

  let Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(OnDidCreateFile(files[I]));
  }

  return Promises;
}

async function OnDidCreateFile(Item: FileCreate): Promise<void> {
  return new Promise((resolve, reject) => {
    const Doc = GetDocument(Item.uri);
    Process(Doc);
    resolve();
  });
}

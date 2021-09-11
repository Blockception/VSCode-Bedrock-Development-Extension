import { FileRename, RenameFilesParams, RenameParams } from "vscode-languageserver";
import { GetDocument } from "../../../Types/Document/Document";
import { GetFilepath, UniformUrl } from "../../../Code/Url";
import { Database } from "../../../Database/Database";
import { Process } from "../../../Process/Process";

//Files created
export async function OnDidRenameFilesAsync(params: RenameFilesParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let Promises = OnDidRenameFiles(params);

    return Promise.all(Promises);
  });
}

function OnDidRenameFiles(params: RenameFilesParams): Promise<void>[] {
  let files = params.files;
  let Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(OnDidRenameFile(files[I]));
  }

  return Promises;
}

async function OnDidRenameFile(Item: FileRename): Promise<void> {
  return new Promise((resolve, reject) => {
    //Delete old data
    const uri = GetFilepath(UniformUrl(Item.oldUri));
    Database.ProjectData.deleteFile(uri);

    //Update new one
    const Doc = GetDocument(Item.newUri);
    Process(Doc);
    resolve();
  });
}

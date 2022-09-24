import { DeleteFilesParams, FileDelete } from "vscode-languageserver";
import { Database } from "../../../Database/Database";
import { Console } from "../../../Manager";
import { Manager } from "../../../Manager/Manager";

//Files created
export async function onDidDeleteFilesAsync(params: DeleteFilesParams): Promise<void> {
  return Console.request(
    "File Deleted",
    Promise.all(onDidDeleteFiles(params)).then(() => {})
  );
}

function onDidDeleteFiles(params: DeleteFilesParams): Promise<void>[] {
  const files = params.files;
  const Promises: Promise<void>[] = [];

  for (let I = 0; I < files.length; I++) {
    Promises.push(onDidDeleteFile(files[I]));
  }

  return Promises;
}

async function onDidDeleteFile(Item: FileDelete): Promise<void> {
  const uri = Item.uri;
  Database.ProjectData.deleteFile(uri);
  //Reset any diagnostics on the file
  Manager.Diagnostic.ResetDocument(Item.uri);
}

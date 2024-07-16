import { Console, Manager } from "../../../manager";
import { Database } from "../../../database/database";
import { FileRename, RenameFilesParams } from "vscode-languageserver";
import { GetDocument } from "../../../types/Document/Document";
import { Process } from "../../../process/Process";
import { Vscode } from "../../../Code/Url";

//Files created
export async function OnDidRenameFilesAsync(params: RenameFilesParams): Promise<void> {
  return Console.request(
    "Files Renamed",
    Promise.all(OnDidRenameFiles(params)).then(() => {})
  );
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
  //Delete old data
  const uri = Vscode.FromFs(Item.oldUri);
  Database.ProjectData.deleteFile(uri);
  Manager.Diagnostic.ResetDocument(uri);

  //Update new one
  const Doc = GetDocument(Item.newUri);
  if (Doc) Process(Doc);
}

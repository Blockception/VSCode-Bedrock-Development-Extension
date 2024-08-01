import { Console, Manager } from "../../../manager";
import {
  CreateFilesParams,
  DeleteFilesParams,
  FileCreate,
  FileDelete,
  FileRename,
  RenameFilesParams,
  WorkspaceFoldersChangeEvent,
} from "vscode-languageserver";
import { GetDocument } from "../../documents";
import { Glob } from "../../../files";
import { Process } from "../../process";
import { QueueProcessor } from "@daanv2/queue-processor";
import { Workspace } from "../../workspace";
import { Database } from "../../../lsp/database";
import { Vscode } from "../../../util";

// Workspace folder changed
export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return Console.request("Workspace Folder Changed", () => OnWorkspaceFolderChange(params));
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {

}

//Files created
export async function OnDidCreateFilesAsync(params: CreateFilesParams): Promise<void> {
  return Console.request("File Created", () => QueueProcessor.forEach(params.files, onDidCreateFile).then(() => {}));
}

//Files deleted
export async function onDidDeleteFilesAsync(params: DeleteFilesParams): Promise<void> {
  return Console.request("File Deleted", () => QueueProcessor.forEach(params.files, onDidDeleteFile).then(() => {}));
}

//Files renamed
export async function OnDidRenameFilesAsync(params: RenameFilesParams): Promise<void> {
  return Console.request("Files Renamed", () => QueueProcessor.forEach(params.files, onDidRenameFile).then(() => {}));
}

async function onDidCreateFile(Item: FileCreate): Promise<void> {
  const Doc = GetDocument(Item.uri);

  if (Doc) {
    let conf = Doc.getConfiguration();

    if (conf.ignores.patterns.length == 0 || !Glob.IsMatch(Doc.uri, conf.ignores.patterns)) {
      Process(Doc);
    } else {
      Console.Log(`Ignored: ` + Doc.uri);
    }
  }
}

async function onDidDeleteFile(Item: FileDelete): Promise<void> {
  const uri = Item.uri;
  Database.ProjectData.deleteFile(uri);
  //Reset any diagnostics on the file
  Manager.Diagnostic.ResetDocument(Item.uri);
}

async function onDidRenameFile(Item: FileRename): Promise<void> {
  //Delete old data
  const uri = Vscode.FromFs(Item.oldUri);
  Database.ProjectData.deleteFile(uri);
  Manager.Diagnostic.ResetDocument(uri);

  //Update new one
  const Doc = GetDocument(Item.newUri);
  if (Doc) Process(Doc);
}

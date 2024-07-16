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
import { Database } from "../../../database";
import { Vscode } from "../../../util";

// Workspace folder changed
export async function OnWorkspaceFolderChangeAsync(params: WorkspaceFoldersChangeEvent): Promise<void> {
  return Console.request("Workspace Folder Changed", Promise.resolve(OnWorkspaceFolderChange(params)));
}

function OnWorkspaceFolderChange(params: WorkspaceFoldersChangeEvent): void {
  const removed = params.removed;

  for (let index = 0; index < removed.length; index++) {
    Workspace.RemoveWorkspace(removed[index].uri);
  }

  //Call to process workspaces
  Workspace.TraverseWorkspaces(params.added);
}

//Files created
export async function OnDidCreateFilesAsync(params: CreateFilesParams): Promise<void> {
  return Console.request(
    "File Created",
    QueueProcessor.forEach(params.files, OnDidCreateFile).then(() => {})
  );
}

async function OnDidCreateFile(Item: FileCreate): Promise<void> {
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

//Files deleted
export async function onDidDeleteFilesAsync(params: DeleteFilesParams): Promise<void> {
  return Console.request(
    "File Deleted",
    QueueProcessor.forEach(params.files, onDidDeleteFile).then(() => {})
  );
}

async function onDidDeleteFile(Item: FileDelete): Promise<void> {
  const uri = Item.uri;
  Database.ProjectData.deleteFile(uri);
  //Reset any diagnostics on the file
  Manager.Diagnostic.ResetDocument(Item.uri);
}

//Files renamed
export async function OnDidRenameFilesAsync(params: RenameFilesParams): Promise<void> {
  return Console.request(
    "Files Renamed",
    QueueProcessor.forEach(params.files, OnDidRenameFile).then(() => {})
  );
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

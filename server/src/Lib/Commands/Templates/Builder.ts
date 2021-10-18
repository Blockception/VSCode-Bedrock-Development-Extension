import {
  TextDocumentEdit,
  CreateFile,
  RenameFile,
  DeleteFile,
  WorkspaceEdit,
  ApplyWorkspaceEditResponse,
  CreateFileOptions,
  TextEdit,
  OptionalVersionedTextDocumentIdentifier,
} from "vscode-languageserver";
import { Manager } from "../../Manager/Manager";
import * as fs from "fs";
import { Range } from "vscode-languageserver-types";
import { Console } from "../../Manager/Console";
import { Fs, Vscode } from "../../Code/Url";
import { Pack } from "bc-minecraft-bedrock-project";
import { Database } from "../../include";
import { AddBlockceptionToPack } from "../../Minecraft/General/Manifests.ts/Functions";

export class TemplateBuilder {
  private receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  public CreateOptions: CreateFileOptions;
  public updatePacks: Pack[];

  constructor() {
    this.receiver = [];
    this.CreateOptions = { ignoreIfExists: true, overwrite: false };
    this.updatePacks = [];
  }

  /**Sends the edits to the client*/
  Send() {
    if (this.receiver.length <= 0) return;

    const Edit: WorkspaceEdit = { documentChanges: this.receiver };
    Manager.Connection.workspace.applyEdit(Edit).then(Response);

    this.updatePacks.forEach(AddBlockceptionToPack);
  }

  CreateFile(uri: string, content: string): void {
    if (uri.startsWith("file:\\")) uri = uri.replace(/\\/gi, "/");

    const path = Fs.FromVscode(uri);
    uri = Vscode.FromFs(path);

    const pack = Database.Database.ProjectData.get(uri);
    if (pack) this.updatePacks.push(pack);

    if (fs.existsSync(path)) {
      Console.Info("creation of file skipped because it already exists: " + path);
      return;
    }

    const Content: TextEdit = {
      newText: content,
      range: Range.create(0, 0, 0, 0),
    };

    Console.Info("Creating: " + path);
    const Version = OptionalVersionedTextDocumentIdentifier.create(uri, null);
    this.receiver.push(CreateFile.create(uri, this.CreateOptions), TextDocumentEdit.create(Version, [Content]));
  }
}

function Response(response: ApplyWorkspaceEditResponse): void {
  if (response.applied) return;

  const keys = Object.getOwnPropertyNames(response);

  if (keys.length === 1) {
    Console.Info("Workspace edit was not applied, possibly of already existing data");
    return;
  }

  Console.Error("Workspace edit failed:");
  if (response.failedChange) Console.Error(`Item index: ${response.failedChange}`);
  if (response.failureReason) Console.Error(`Item reason: ${response.failureReason}`);
}

import {
  TextDocumentEdit,
  CreateFile,
  RenameFile,
  DeleteFile,
  WorkspaceEdit,
  CreateFileOptions,
  TextEdit,
  OptionalVersionedTextDocumentIdentifier,
  ApplyWorkspaceEditResult,
} from "vscode-languageserver";
import { Manager } from "../../Manager/Manager";
import { Range } from "vscode-languageserver-types";
import { Console } from "../../Manager/Console";
import { Fs, Vscode } from "../../Code/Url";

import * as fs from "fs";

export class TemplateBuilder {
  private receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  public CreateOptions: CreateFileOptions;

  constructor() {
    this.receiver = [];
    this.CreateOptions = { ignoreIfExists: true, overwrite: false };
  }

  /**Sends the edits to the client*/
  Send(): Promise<void> {
    if (this.receiver.length <= 0) return Promise.resolve();

    const Edit: WorkspaceEdit = { documentChanges: this.receiver };
    return Manager.Connection.workspace.applyEdit(Edit).then(Response);
  }

  CreateFile(uri: string, content: string): void {
    if (uri.startsWith("file:\\")) uri = uri.replace(/\\/gi, "/");

    const path = Fs.FromVscode(uri);
    uri = Vscode.FromFs(path);

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

function Response(response: ApplyWorkspaceEditResult): void {
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

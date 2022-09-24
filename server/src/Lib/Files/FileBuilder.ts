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
  Range,
} from "vscode-languageserver";
import { Fs, Vscode } from "../Code";
import { Console, Manager } from "../Manager";
import * as fs from "fs";

/**
 *
 */
export class FileBuilder {
  private _receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  public CreateOptions: CreateFileOptions;

  constructor() {
    this._receiver = [];
    this.CreateOptions = { ignoreIfExists: true, overwrite: false };
  }

  /**
   * Sends the edits to the client
   * @returns
   */
  async Send(): Promise<void> {
    if (this._receiver.length <= 0) return;

    const Edit: WorkspaceEdit = { documentChanges: this._receiver };
    return Manager.Connection.workspace.applyEdit(Edit).then(Response);
  }

  /**
   *
   * @param uri
   * @param content
   * @returns
   */
  CreateFile(uri: string, content: string): void {
    if (uri.startsWith("file:\\")) uri = uri.replace(/\\/gi, "/");

    const path = Fs.FromVscode(uri);
    uri = Vscode.FromFs(path);

    if (fs.existsSync(path)) {
      Console.Log("Creation of file skipped because it already exists: " + path);
      return;
    }

    const Content: TextEdit = {
      newText: content,
      range: Range.create(0, 0, 0, 0),
    };

    Console.Log("Creating file: " + path);
    const Version = OptionalVersionedTextDocumentIdentifier.create(uri, null);
    this._receiver.push(CreateFile.create(uri, this.CreateOptions), TextDocumentEdit.create(Version, [Content]));
  }
}

/**
 *
 * @param response
 * @returns
 */
function Response(response: ApplyWorkspaceEditResult): void {
  if (response.applied) return;

  const keys = Object.getOwnPropertyNames(response);

  if (keys.length === 1) {
    Console.Error("Workspace edit was not applied, possibly of already existing data");
    return;
  }

  Console.Error("Workspace edit failed:");
  if (response.failedChange) Console.Error(`Item index: ${response.failedChange}`);
  if (response.failureReason) Console.Error(`Item reason: ${response.failureReason}`);
}

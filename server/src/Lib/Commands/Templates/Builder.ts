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
import { URI } from "vscode-uri";
import { Manager } from "../../Manager/Manager";
import * as fs from "fs";
import { Console } from "../../Console/Console";
import { GetFilepath, UniformUrl } from "../../Code/include";
import { Range } from "vscode-languageserver-types";

export class TemplateBuilder {
  private receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  public CreateOptions: CreateFileOptions;

  constructor() {
    this.receiver = [];
    this.CreateOptions = { ignoreIfExists: true, overwrite: false };
  }

  /**Sends the edits to the client*/
  Send() {
    const Edit: WorkspaceEdit = { documentChanges: this.receiver };

    Manager.Connection.workspace.applyEdit(Edit).then(Response);
  }

  CreateFile(uri: string, content: string): void {
    uri = UniformUrl(uri);

    const path = GetFilepath(uri);
    const url = URI.file(path);

    if (fs.existsSync(path)) {
      Console.Log("creation of file skipped because it already exists: " + path);
      return;
    }

    const Content: TextEdit = {
      newText: content,
      range: Range.create(0, 0, 0, 0),
    };

    uri = url.toString();

    const Version = OptionalVersionedTextDocumentIdentifier.create(uri, null);
    this.receiver.push(CreateFile.create(uri, this.CreateOptions), TextDocumentEdit.create(Version, [Content]));
  }
}

function Response(response: ApplyWorkspaceEditResponse): void {
  if (response.applied) return;

  Console.Error("Workspace edit failed:");
  if (response.failedChange) Console.Error(`Item index: ${response.failedChange}`);
  if (response.failureReason) Console.Error(`Item reason: ${response.failureReason}`);
}

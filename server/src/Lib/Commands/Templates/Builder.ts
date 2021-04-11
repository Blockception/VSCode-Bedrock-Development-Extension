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
import { EmptyTypes } from "../../Types/General/include";
import { normalize } from "path";
import { GetFilepath, UniformUrl } from "../../Code/Url";
import { Console } from "../../Console/Console";

export class TemplateBuilder {
  private receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  public CreateOptions: CreateFileOptions;

  constructor() {
    this.receiver = [];
    this.CreateOptions = { ignoreIfExists: true, overwrite: false };
  }

  /**Sends the edits to the client*/
  Send() {
    let Edit: WorkspaceEdit = {
      documentChanges: this.receiver,
    };

    Manager.Connection.workspace.applyEdit(Edit).then(Response);
  }

  CreateFile(uri: string, content: string): void {
    uri = uri.replace(/\\/g, "/");
    uri = uri.replace("%3A", ":");
    if (uri.startsWith("file:/")) {
      uri = uri.substring(6);
    }

    let Obj = URI.file(uri);
    let path = Obj.fsPath;

    if (fs.existsSync(path)) {
      Console.Log("creation of file skipped because it already exists: " + path);
      return;
    }

    uri = Obj.toString();

    let Content: TextEdit = {
      newText: content,
      range: EmptyTypes.EmptyRange(),
    };

    let Version = OptionalVersionedTextDocumentIdentifier.create(uri, null);
    this.receiver.push(CreateFile.create(uri, this.CreateOptions), TextDocumentEdit.create(Version, [Content]));
  }
}

function Response(response: ApplyWorkspaceEditResponse): void {
  if (response.applied) return;

  Console.Log("Workspace edit failed:");
  Console.Log(`Item index: ${response.failedChange}`);
  Console.Log(`Item reason: ${response.failureReason}`);
}

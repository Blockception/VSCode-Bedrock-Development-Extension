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
import { Range } from "vscode-languageserver-types";
import { Fs, Vscode } from "../../../util/url";
import { IExtensionContext } from "../../extension/context";

import * as fs from "fs";

export class TemplateBuilder {
  private receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  readonly context: IExtensionContext;
  readonly options: CreateFileOptions;

  constructor(context: IExtensionContext) {
    this.context = context;
    this.receiver = [];
    this.options = { ignoreIfExists: true, overwrite: false };
  }

  /**Sends the edits to the client*/
  send(): Promise<void> {
    if (this.receiver.length <= 0) return Promise.resolve();

    const Edit: WorkspaceEdit = { documentChanges: this.receiver };
    return this.context.connection.workspace.applyEdit(Edit).then(this.handleResponse.bind(this));
  }

  createFile(uri: string, body: string): void {
    if (uri.startsWith("file:\\")) uri = uri.replace(/\\/gi, "/");

    const path = Fs.FromVscode(uri);
    uri = Vscode.FromFs(path);

    if (fs.existsSync(path)) {
      this.context.logger.info("creation of file skipped because it already exists: " + path);
      return;
    }

    const content: TextEdit = {
      newText: body,
      range: Range.create(0, 0, 0, 0),
    };

    this.context.logger.info("creating: " + path);
    const document = OptionalVersionedTextDocumentIdentifier.create(uri, null);
    this.receiver.push(CreateFile.create(uri, this.options), TextDocumentEdit.create(document, [content]));
  }

  handleResponse(response: ApplyWorkspaceEditResult): void {
    if (response.applied) return;

    const keys = Object.getOwnPropertyNames(response);

    if (keys.length === 1) {
      this.context.logger.info("Workspace edit was not applied, possibly of already existing data");
      return;
    }

    this.context.logger.error("Workspace edit failed", response);
  }
}

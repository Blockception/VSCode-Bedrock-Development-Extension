/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
	 list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
	 this list of conditions and the following disclaimer in the documentation
	 and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
	 contributors may be used to endorse or promote products derived from
	 this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
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
import { Manager } from "../../manager/Manager";
import * as fs from "fs";
import { EmptyTypes } from "../../types/general/include";
import { normalize } from "path";
import { GetFilepath, UniformUrl } from "../../Code/Url";
import { Console } from "../../console/Console";

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

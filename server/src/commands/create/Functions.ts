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
import * as fs from "fs";
import {
  CreateFileOptions,
  TextDocumentEdit,
  CreateFile,
  DeleteFile,
  RenameFile,
  OptionalVersionedTextDocumentIdentifier,
  TextEdit,
  WorkspaceEdit,
  ApplyWorkspaceEditResponse,
} from "vscode-languageserver/node";
import { URI } from "vscode-uri";
import { Manager } from "../../manager/include";
import { EmptyTypes } from "../../types/general/Empty";

const CreateOptions: CreateFileOptions = { ignoreIfExists: true, overwrite: false };

export function CreateFileFunction(uri: string, content: string, receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[]): void {
  let Obj = URI.file(uri);
  let path = Obj.fsPath;

  if (fs.existsSync(path)) {
    return;
  }

  uri = Obj.toString();

  let Content: TextEdit = {
    newText: content,
    range: EmptyTypes.EmptyRange(),
  };

  let Version = OptionalVersionedTextDocumentIdentifier.create(uri, null);
  receiver.push(CreateFile.create(uri, CreateOptions), TextDocumentEdit.create(Version, [Content]));
}

export function SendEdit(WorkspaceEdit: WorkspaceEdit): void {
  Manager.Connection.workspace.applyEdit(WorkspaceEdit).then(Response);
}

function Response(response: ApplyWorkspaceEditResponse): void {
  if (response.applied) return;

  console.log("Workspace edit failed:");
  console.log(`Item index: ${response.failedChange}`);
  console.log(`Item reason: ${response.failureReason}`);
}

export function GenerateSafeID(ID: string): string {
  let Index = ID.indexOf(":");

  if (Index > -1) {
    ID = ID.substring(Index + 1);
  }

  ID = ID.replace(/:/gi, ".");

  return ID;
}

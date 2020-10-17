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
import * as fg from "fast-glob";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { McFunctionIdentifier, McLanguageIdentifier, McOtherIdentifier } from "../Constants";
import { Manager } from "../manager/Manager";
import { GetDocument } from "../code/include";
import { Process } from "./Process";

export function TraverseWorkspaces(): void {
  Manager.Connection.workspace.getWorkspaceFolders().then((WorkFolders) => {
    if (!WorkFolders) return;

    WorkFolders.forEach((wf) => TraverseWorkspace(wf));
  });
}

export function TraverseWorkspace(workspace: WorkspaceFolder): void {
  const uri = workspace.uri;
  let Path = URI.parse(uri).fsPath;
  TraveseDirectory(Path);
}

//Traverse the directory
export function TraveseDirectory(Dir: string): void {
  //console.log('exploring: ' + Dir);
  if (!Dir.endsWith("\\")) {
    Dir += "\\";
  }

  Dir = Dir.replace(/\\/g, "/");

  const mcfunctions = fg.sync(Dir + "**/*.mcfunction", { absolute: true, onlyFiles: true });
  const jsons = fg.sync(Dir + "**/*.json", { absolute: true, onlyFiles: true });
  const languagfile = fg.sync(Dir + "**/*.lang", { absolute: true, onlyFiles: true });

  if (mcfunctions.length > 0) Parsefiles(mcfunctions, McFunctionIdentifier);

  if (jsons.length > 0) Parsefiles(jsons, McOtherIdentifier);

  if (languagfile.length > 0) Parsefiles(languagfile, McLanguageIdentifier);
}

function Parsefiles(files: string[], languageID: string) {
  for (let index = 0; index < files.length; index++) {
    Parse(files[index], languageID);
  }
}

function Parse(path: string, languageID: string) {
  let Doc = GetDocument(path, undefined, languageID);
  Process(Doc);
}

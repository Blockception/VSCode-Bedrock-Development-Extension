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
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../../../../code/include";
import { ProcessCommand } from "../../../../commands/Process";
import { Languages } from "../../../../Constants";
import { Database } from "../../../../database/include";
import { Manager } from "../../../../manager/Manager";
import { McFunction } from "../../../general/Functions/include";
import { ProvideMcfunctionDiagnostics } from "./Diagnostics";
import { GetComment } from "./Function";

export function Process(document: TextDocument): void {
  Database.Data.DeleteFile(document.uri);

  if (document.languageId !== Languages.McFunctionIdentifier) return;

  ProcessContent(document);
  ProvideMcfunctionDiagnostics(document);
}

function ProcessContent(document: TextDocument): void {
  for (let Index = 0; Index < document.lineCount; Index++) {
    const Line = getLine(document, Index);

    ProcessCommand(Line, { character: 0, line: Index }, document);
  }

  const uri = document.uri;
  let Index = uri.indexOf("\\functions\\");

  if (Index > -1) {
    let Identifier = uri.slice(Index + 11, uri.length);
    Identifier = Identifier.replace(/\\/g, "/");
    Identifier = Identifier.replace(".mcfunction", "");

    if (Identifier.includes(" ")) {
      Identifier = '"' + Identifier + '"';
    }

    let Mcfunction = new McFunction();
    Mcfunction.Identifier = Identifier;
    Mcfunction.Location.uri = uri;

    //Get first comment as documentation
    const FirstLine = getLine(document, 0);
    const Comment = GetComment(FirstLine).trim();

    if (Comment === "") {
      Mcfunction.Documentation.value = "A function without definition, make a comment on the first line to fill this space :D";
    } else {
      Mcfunction.Documentation.value = Comment;
    }

    Database.Data.General.Functions.Set(Mcfunction);
  }
}

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
import { Manager } from "../../Manager/include";
import { DiagnosticsBuilder } from "../../Diagnostics/Builder";
import { getLine } from "../../Code/include";

export function provideLanguageDiagnostics(doc: TextDocument) {
  if (!Manager.Settings.Diagnostics.Lang) return;

  let builder = new DiagnosticsBuilder(doc);

  let Keys = new Array<string>(doc.lineCount);

  for (let I = 0; I < doc.lineCount; I++) {
    let line = getLine(doc, I).trim();
    Diagnoseline(line, I, Keys, builder);
  }

  builder.SendDiagnostics();
}

export function Diagnoseline(line: string, index: number, Keys: string[], builder: DiagnosticsBuilder): void {
  let CommentIndex = line.indexOf("#");
  if (CommentIndex >= 0) {
    if (line.substring(CommentIndex, CommentIndex + 2) !== "##") {
      builder.AddAt("A comment is always ##", index, CommentIndex, CommentIndex + 1);
    }

    if (CommentIndex > 0) {
      if (line.charAt(CommentIndex - 1) !== "\t") {
        builder.AddAt("Before a comment but be a tab", index, CommentIndex - 1, CommentIndex);
      }
    }

    line = line.substring(0, CommentIndex).trim();
  }

  if (line === "" || line === "\r" || line === "\r\n" || line == "") {
    if (CommentIndex > 0) {
      builder.AddAt("A line cannot be with an identented comment", index, 0, CommentIndex);
    }

    return;
  }

  let Index = line.indexOf("=");

  if (Index < 0) {
    builder.AddAt("A translation item needs a '=' to seperate key and value", index, 0, line.length);
  } else {
    const Key = line.substring(0, Index);
    const KeyIndex = Keys.indexOf(Key);

    if (KeyIndex >= 0 && KeyIndex != index) {
      builder.AddAt("Duplicate key found at: " + KeyIndex, index, 0, Key.length);
      builder.AddAt("Duplicate key found at: " + index, KeyIndex, 0, Key.length);
    }

    Keys[index] = Key;
  }

  if (Index >= line.length) {
    builder.AddAt("A value must be atleast lenght of 1 or more", index, 0, line.length);
  }
}

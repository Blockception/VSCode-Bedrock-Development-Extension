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
import { CompletionItem, InsertReplaceEdit, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { json } from "../Code/include";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { CompletionBuilder } from "./Builder";
import { OnCompletionMcFunctionLine } from "./Mcfunction";
import { OnCompletionEntityEvents, OnCompletionMolang } from "./Molang/Molang";

export function OnCompletionJson(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  let type = DetectGeneralDataType(doc.uri);

  if (type == GeneralDataType.unknown) return;

  let text = doc.getText();
  let range = json.GetCurrentString(text, cursor);

  //If start has not been found or not a property
  if (range == undefined) return;

  let data = text.substring(range.start, range.end);
  let insertIndex = cursor - range.start;
  let first = '"' + data.substring(0, insertIndex);
  let second = data.substring(insertIndex) + '"';
  let P = doc.positionAt(cursor);
  let R = Range.create(P, P);

  //Have each new item pass through a new function
  receiver.OnNewItem = (NewItem: CompletionItem) => {
    //Update the filtering text
    NewItem.filterText = first + NewItem.label + second;
    NewItem.textEdit = InsertReplaceEdit.create(NewItem.label, R, R);
  };

  //Find all events
  if (data.startsWith("@s")) {
    OnCompletionEntityEvents(receiver);
  } else if (data.startsWith("/")) {
    let temp = data.substring(1);
    OnCompletionMcFunctionLine(temp, cursor, range.start + 1, doc, receiver);
  } else {
    OnCompletionMolang(data, cursor - range.start, doc, receiver);
  }

  receiver.OnNewItem = undefined;
}

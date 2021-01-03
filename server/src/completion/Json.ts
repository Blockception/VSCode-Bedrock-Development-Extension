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
import { CompletionList, InsertReplaceEdit, Range } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { json } from '../code/include';
import { DetectGeneralDataType, GeneralDataType } from '../types/minecraft/format/include';
import { OnCompletionMcFunctionLine } from './Mcfunction';
import { OnCompletionEntityEvents, OnCompletionMolang } from './Molang/Molang';

export function OnCompletionJson(doc: TextDocument, cursor: number, receiver: CompletionList): void {
	let type = DetectGeneralDataType(doc.uri);

	if (type == GeneralDataType.unknown) return;

	let text = doc.getText();
	let range = json.GetCurrentString(text, cursor);
	let Out = CompletionList.create([], false);

	//If start has not been found or not a property
	if (range == undefined)
		return;

	let data = text.substring(range.start, range.end);

	//Find all events
	if (data.startsWith('@s')) {
		OnCompletionEntityEvents(Out);
	}
	else if (data.startsWith('/')) {
		let temp = data.substring(1);
		OnCompletionMcFunctionLine(temp, cursor, range.start + 1, doc, Out);
	}
	else {
		OnCompletionMolang(data, cursor - range.start, doc, Out);
	}

	let insertIndex = cursor - range.start;
	let first = '"' + data.substring(0, insertIndex);
	let second = data.substring(insertIndex) + '"';
	let P = doc.positionAt(cursor);
	let R = Range.create(P, P);

	for (let I = 0; I < Out.items.length; I++) {
		let Item = Out.items[I];

		Item.filterText = first + Item.label + second;
		Item.textEdit = InsertReplaceEdit.create(Item.label, R, R);
		receiver.items.push(Item);
	}
}
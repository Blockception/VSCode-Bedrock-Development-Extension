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
import { PublishDiagnosticsParams } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getLine } from '../code/include';
import { Manager } from '../Manager';
import { NewError } from './Functions';

export function provideLanguageDiagnostics(doc: TextDocument) {
	let Out: PublishDiagnosticsParams = {
		uri: doc.uri,
		diagnostics: []
	};

	let Keys = new Array<string>(doc.lineCount);

	for (let I = 0; I < doc.lineCount; I++) {
		let Line = getLine(doc, I);

		let CommentIndex = Line.indexOf('#');
		if (CommentIndex >= 0) {
			Line = Line.substring(0, CommentIndex).trim();
		}

		if (Line === '')
			continue;

		let Index = Line.indexOf('=');

		if (Index < 0) {
			NewError(Out.diagnostics, I, 0, Line.length, "A translation item needs a '=' to seperate key and value");
		}
		else {
			const Key = Line.substring(0, Index);
			const KeyIndex = Keys.indexOf(Key);

			if (KeyIndex >= 0 && KeyIndex != I) {
				NewError(Out.diagnostics, I, 0, Key.length, "Duplicate key found at: " + KeyIndex);
				NewError(Out.diagnostics, KeyIndex, 0, Key.length, "Duplicate key found at: " + I);
			}

			Keys[I] = Key;
		}

		if (Index >= Line.length) {
			NewError(Out.diagnostics, I, 0, Line.length, "A value must be atleast lenght of 1 or more");
		}
	}

	Manager.Connection.sendDiagnostics(Out);
}


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
import * as fs from 'fs';
import { Range, TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { Manager } from '../Manager';

export interface IDocument {
	readonly LineCount : number;
	readonly Uri : string;

	getLine(index : number) : string;
}

export class FileDocument implements IDocument {
	private Lines: string[];
	readonly Uri: string;
	readonly Range: Range;
	readonly LineCount : number;

	constructor(uri: string, Content: string) {
		this.Uri = uri;
		this.Lines = Content.split(/(\r\n|\n)/);

		var LastIndex = this.Lines.length - 1;
		var Last = this.Lines[LastIndex];
		this.Range = {
			start: { character: 0, line: 0 },
			end: { character: Last.length, line: LastIndex }
		};

		this.LineCount = this.Lines.length;
	}

	public getLine(index : number) : string {
		return this.Lines[index];
	}

	static Load(uri: string) : IDocument {
		var Content = fs.readFileSync(uri, 'utf8');
		return new FileDocument(uri, Content);
	}
}

export class DocumentImp implements IDocument {
	private doc : TextDocument;

	readonly LineCount: number;
	readonly Uri: string;

	constructor(doc : TextDocument){
		this.doc = doc;
		this.LineCount = doc.lineCount;
		this.Uri = doc.uri;
	}

	public getLine(index: number) : string {
		return this.doc.getText({start:{character:0,line:index},end:{character:Number.MAX_SAFE_INTEGER,line:index}})
	}
}

export function GetDocument(uri: string, languageID: string) : IDocument {
	var Content = '';

	var doc = Manager.Documents.get(uri);

	if (doc != undefined){
		return new DocumentImp(doc);
	}

	Content = fs.readFileSync(uri, 'utf8');
	var Out = new DocumentImp(TextDocument.create(uri, languageID, 0, Content));

	return Out;
}

export function GetDocument2(doc : TextDocument) : IDocument {
	return new DocumentImp(doc);
}
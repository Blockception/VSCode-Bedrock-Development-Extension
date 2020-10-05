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

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class FillDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//from x y z
		let Out = Functions.provideDiagnosticsXYZ('fill', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		//<to: x y z>
		Out = Functions.provideDiagnosticsXYZ('fill', Out[0], lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;
		
		let Block = Out[0].Child;

		//<tileName: Block>
		if (Block == undefined) {
			Errors.Missing('block', 'fill', lineIndex, Out[0], collector);
			return;
		}

		dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

		let Data = Block.Child;

		//optional
		if (Data == undefined)
			return;

		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

		let Mode = Data.Child;

		//optional
		if (Mode == undefined)
			return;

		switch(Mode.Text.text)	{
			case 'outline':
			case 'hollow':
			case 'destroy':
			case 'keep':
				return;
				
			case 'replace':
				this.branchReplace(Mode, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('outline, hollow, destroy, keep, replace', lineIndex, Mode, collector);
				return;
		}
	}

	branchReplace(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		let Block = item.Child;

		//<tileName: Block>
		if (Block == undefined) {
			return;
		}

		dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

		let Data = Block.Child;

		//optional
		if (Data == undefined)
			return;

		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);
	}

}

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
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class TickingAreaDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		let Mode = item.Child;

		if (Mode == undefined) {
			Errors.Missing('mode', 'tickingarea', lineIndex, item, collector);
			return;
		}

		switch (Mode.Text.text) {
			case 'list':
				this.branchlist(item, lineIndex, collector, dm, document);
				return;

			case 'remove_all':
				return;

			case 'remove':
				this.branchremove(item, lineIndex, collector, dm, document);
				return;

			case 'add':
				this.branchadd(item, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('list, remove_all, remove, add', lineIndex, Mode, collector);
				return;
		}

	}

	//tickingarea list
	branchlist(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		let Boolean = item.Child;

		//[all-dimensions]
		if (Boolean == undefined) {
			return;
		}

		if (Boolean.Text.text != "all-dimensions") {
			collector.push(new vscode.Diagnostic(
				Boolean.Text.ToRange(lineIndex),
				"expected value: all-dimensions",
				vscode.DiagnosticSeverity.Error
			));
		}
	}

	//tickingarea remove
	branchremove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		let Reference = item.Child;

		if (Reference == undefined) {
			Errors.Missing('position | name', 'tickingarea', lineIndex, item, collector);
			return;
		}

		switch (Reference.Text.text.charAt(0)) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				//time integer
				Functions.provideDiagnosticsXYZ('tickingarea', Reference, lineIndex, collector, dm, document);
				return;

			default:
				dm.TickingAreaDiagnoser?.provideDiagnostic(Reference, lineIndex, collector, dm, document);
				return;
		}
	}

	//tickingarea add
	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		let Next = item.Child;

		if (Next == undefined) {
			Errors.Missing('position | circle', 'tickingarea', lineIndex, item, collector);
			return;
		}

		if (Next.Text.text == "circle") {
			this.branchcircle(Next, lineIndex, collector, dm, document);
			return;
		}

		this.branchfrom(Next, lineIndex, collector, dm, document);
	}

	//tickingarea add circle
	branchcircle(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		//<center: x y z>
		let Out = Functions.provideDiagnosticsXYZ('tickingarea', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		let Radius = Out[0].Child;

		//<radius: int>
		if (Radius == undefined) {
			Errors.Missing('TODO Type', 'tickingarea', lineIndex, Out[0], collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Radius, lineIndex, collector, dm, document);

		let Name = Radius.Child;

		//[name: string]
		if (Name == undefined) {
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(Name, lineIndex, collector, dm, document);
	}

	//tickingarea add <from>
	branchfrom(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		//<from: x y z>
		let Out = Functions.provideDiagnosticsXYZ('tickingarea', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		//<to: x y z>
		Out = Functions.provideDiagnosticsXYZ('tickingarea', Out[0], lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		let Name = Out[0].Child;

		//[name: string]
		if (Name == undefined) {
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(Name, lineIndex, collector, dm, document);

	}
}

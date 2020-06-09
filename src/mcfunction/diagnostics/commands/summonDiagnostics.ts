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

export class SummonDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var EntityType = item.Child;

		//<entityType: EntityType>
		if (EntityType == undefined) {
			Errors.Missing('entity type', 'summon', lineIndex, item, collector);
			return;
		}

		dm.EntityDiagnoser?.provideDiagnostic(EntityType, lineIndex, collector, dm, document);

		var Next = EntityType.Child;

		if (Next == undefined)
			return;

		var NextText = Next.Text.text;
		var FirstChar = NextText.charAt(0);

		switch (FirstChar) {
			case '-':
			case '+':
			case '.':
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
			case '~':
			case '^':
				this.branchspawnPos(Next, lineIndex, collector, dm, document);
				return;

			default:
			case '"':
				this.branchnameTag(Next, lineIndex, collector, dm, document);
				return;
		}
	}

	branchspawnPos(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var XCoord = item;

		//[position: x y z]
		if (XCoord == undefined) {
			return;
		}

		var SpawnEvent: SyntaxItem | undefined;
		if (XCoord.Text.text != "~~~") {
			dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);

			var YCoord = XCoord.Child;

			//[position: x y z]
			if (YCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

			var ZCoord = YCoord.Child;

			//[position: x y z]
			if (ZCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);

			SpawnEvent = ZCoord.Child;
		}
		else {
			SpawnEvent = XCoord.Child;
		}

		//[spawnEvent: string]
		if (SpawnEvent == undefined) {
			return;
		}
		//TODO Event trigger?

		var Name = SpawnEvent.Child;

		//[nameTag: string]
		if (Name == undefined) {
			return;
		}

		dm.StringDiagnoser?.provideDiagnostic(Name, lineIndex, collector, dm, document);
	}


	branchnameTag(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var XCoord = item.Child;

		//[position: x y z]
		if (XCoord == undefined) {
			return;
		}

		if (XCoord.Text.text != "~~~") {
			dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);

			var YCoord = XCoord.Child;

			//[position: x y z]
			if (YCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

			var ZCoord = YCoord.Child;

			//[position: x y z]
			if (ZCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);

		}
	}
}


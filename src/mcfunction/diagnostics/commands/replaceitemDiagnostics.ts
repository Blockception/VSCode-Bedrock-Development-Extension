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

export class ReplaceItemDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Mode = item.Child;

		if (Mode == undefined) {
			Errors.Missing('block | entity', 'replaceitem', lineIndex, item, collector);
			return;
		}

		switch (Mode.Text.text) {
			case 'block':
				this.branchblock(Mode, lineIndex, collector, dm, document);
				return;

			case 'entity':
				this.branchentity(Mode, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('entity, block', lineIndex, Mode, collector);
				return;
		}

	}

	branchblock(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		//<position: x y z>
		var Out = Functions.provideDiagnosticsXYZ('replaceitem', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		var slot = Out[0].Child;

		//slot.container
		if (slot == undefined) {
			Errors.Missing('slot.container', 'replaceitem', lineIndex, Out[0], collector);
			return;
		}

		//TODO check slot containers
		if (slot.Text.text != 'slot.container'){
			collector.push(new vscode.Diagnostic(slot.Text.ToRange(lineIndex), 'slot type must be: slot.container', vscode.DiagnosticSeverity.Error));
		}

		this.branchMerged(slot, lineIndex, collector, dm, document);
	}

	branchentity(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Target = item.Child;

		//<target: target>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'replaceitem', lineIndex, item, collector);
			return;
		}
		dm.SelectorDiagnoser.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var slot = Target.Child;

		//<slotType: EntityEquipmentSlot>
		if (slot == undefined) {
			Errors.Missing('entity slot', 'replaceitem', lineIndex, Target, collector);
			return;
		}

		//TODO entity slot

		this.branchMerged(slot, lineIndex, collector, dm, document);
	}

	branchMerged(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var SlotID = item.Child;

		//<slotId: int>
		if (SlotID == undefined) {
			Errors.Missing('integer', 'replaceitem', lineIndex, item, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(SlotID, lineIndex, collector, dm, document);

		var Item = SlotID.Child;

		//<itemName: Item>
		if (Item == undefined) {
			Errors.Missing('item', 'replaceitem', lineIndex, SlotID, collector);
			return;
		}
		dm.ItemDiagnoser?.provideDiagnostic(Item, lineIndex, collector, dm, document);

		var Amount = Item.Child;

		//[amount: int]
		if (Amount == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Amount, lineIndex, collector, dm, document);

		var Data = Amount.Child;

		//[data: int]
		if (Data == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

		var components = Data.Child;

		//[components: json]
		if (components == undefined) {
			return;
		}

		dm.JsonItemComponentDiagnoser?.provideDiagnostic(components, lineIndex, collector, dm, document);
	}
}

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class replaceitemDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'block':
			this.branchblock(item, lineIndex, collector, dm, document);
			return;

		case 'entity':
			this.branchentity(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchblock(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//block
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

		//<position: x y z>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

		//slot.container
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

		//<slotId: int>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<itemName: Item>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.ItemDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[amount: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[data: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[components: json]
		if (word == undefined) {
			return;
		}

	}
	branchentity(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//entity
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

		//<target: target>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<slotType: EntityEquipmentSlot>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

		//<slotId: int>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<itemName: Item>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.ItemDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[amount: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[data: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[components: json]
		if (word == undefined) {
			return;
		}

	}
}

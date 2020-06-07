import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
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
			//MISSING ERROR
		}

		//<position: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//slot.container
		if (word == undefined) {
			//MISSING ERROR
		}

		//<slotId: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//<itemName: Item>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.ItemDiagnoser(word, lineIndex, collector, dm, document);

		//[amount: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[data: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[components: json]
		if (word == undefined) {
			return;
		}

	}
	branchentity(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//entity
		if (word == undefined) {
			//MISSING ERROR
		}

		//<target: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

		//<slotType: EntityEquipmentSlot>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<slotId: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//<itemName: Item>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.ItemDiagnoser(word, lineIndex, collector, dm, document);

		//[amount: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[data: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[components: json]
		if (word == undefined) {
			return;
		}

	}
}

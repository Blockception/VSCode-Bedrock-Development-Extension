import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class giveDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<player: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

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

		switch(item.text) {
		case '[components: json]':
			this.branchcomponents(item, lineIndex, collector, dm, document);
			return;

		case '{ "minecraft:can_destroy": { "blocks": [ "grass" ]}, "minecraft:can_place_on": { "blocks": [ "grass" ]}}':
			this.branch{ "minecraft(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchcomponents(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//[components: json]
		if (word == undefined) {
			return;
		}

	}
	branch{ "minecraft(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//{ "minecraft:can_destroy": { "blocks": [ "grass" ]}, "minecraft:can_place_on": { "blocks": [ "grass" ]}}
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	}

}

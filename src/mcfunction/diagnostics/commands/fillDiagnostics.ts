import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class fillDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<from: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<to: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<tileName: Block>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.BlockDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		switch(item.text) {
		case '[tileData: int]':
			this.branchtileData(item, lineIndex, collector, dm, document);
			return;

		case '<tileData: int>':
			this.branchtileData(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchtileData(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//[tileData: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[outline|hollow|destroy|keep]
		if (word == undefined) {
			return;
		}

	}
	branchtileData(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<tileData: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//replace
		if (word == undefined) {
			//MISSING ERROR
		}

		//[replaceTileName: Block]
		if (word == undefined) {
			return;
		}
		dm.BlockDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[replaceDataValue: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	}

}

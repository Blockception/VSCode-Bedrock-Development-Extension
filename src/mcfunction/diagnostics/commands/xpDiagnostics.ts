import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class xpDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case '<amount: int>':
			this.branchamount(item, lineIndex, collector, dm, document);
			return;

		case '<amount: int>L':
			this.branchamount(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchamount(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<amount: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[player: target]
		if (word == undefined) {
			return;
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

	}
	branchamount(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<amount: int>L
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[player: target]
		if (word == undefined) {
			return;
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

	}
}

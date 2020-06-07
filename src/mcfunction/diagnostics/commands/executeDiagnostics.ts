import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class executeDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<origin: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

		//<position: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case '<command: command>':
			this.branchcommand(item, lineIndex, collector, dm, document);
			return;

		case 'detect':
			this.branchdetect(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchcommand(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<command: command>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchdetect(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//detect
		if (word == undefined) {
			//MISSING ERROR
		}

		//<detectPos: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<block: Block>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.BlockDiagnoser(word, lineIndex, collector, dm, document);

		//<data: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//<command: command>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	}

}

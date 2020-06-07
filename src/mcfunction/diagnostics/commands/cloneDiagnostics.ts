import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class cloneDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<begin: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<end: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<destination: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case '[replace|masked]':
			this.branchreplace_masked(item, lineIndex, collector, dm, document);
			return;

		case 'filtered':
			this.branchfiltered(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchreplace_masked(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//[replace|masked]
		if (word == undefined) {
			return;
		}

		//[normal|force|move]
		if (word == undefined) {
			return;
		}

	}
	branchfiltered(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//filtered
		if (word == undefined) {
			//MISSING ERROR
		}

		//<normal|force|move>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<tileName: Block>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.BlockDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<tileData: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	}

}

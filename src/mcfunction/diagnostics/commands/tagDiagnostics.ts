import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class tagDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<targets>
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case 'remove':
			this.branchremove(item, lineIndex, collector, dm, document);
			return;

		case 'list':
			this.branchlist(item, lineIndex, collector, dm, document);
			return;

		case 'add':
			this.branchadd(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchremove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//remove
		if (word == undefined) {
			//MISSING ERROR
		}

		//<name>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchlist(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//list
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//add
		if (word == undefined) {
			//MISSING ERROR
		}

		//<name>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	}

}

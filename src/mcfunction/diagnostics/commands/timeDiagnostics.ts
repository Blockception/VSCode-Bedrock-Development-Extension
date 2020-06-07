import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class timeDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'add':
			this.branchadd(item, lineIndex, collector, dm, document);
			return;

		case 'set':
			this.branchset(item, lineIndex, collector, dm, document);
			return;

		case 'query':
			this.branchquery(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//add
		if (word == undefined) {
			//MISSING ERROR
		}

		//<amount: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

	}
	branchset(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//set
		if (word == undefined) {
			//MISSING ERROR
		}

		//<time: TimeSpec|amount: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

	}
	branchquery(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//query
		if (word == undefined) {
			//MISSING ERROR
		}

		//<daytime|gametime|day>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
}

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class tickingareaDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'list':
			this.branchlist(item, lineIndex, collector, dm, document);
			return;

		case 'remove_all':
			this.branchremove_all(item, lineIndex, collector, dm, document);
			return;

		case 'remove':
			this.branchremove(item, lineIndex, collector, dm, document);
			return;

		case 'add':
			this.branchadd(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchlist(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//list
		if (word == undefined) {
			//MISSING ERROR
		}

		//[all-dimensions]
		if (word == undefined) {
			return;
		}

	}
	branchremove_all(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//remove_all
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchremove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//remove
		if (word == undefined) {
			//MISSING ERROR
		}

		//<position: x y z|name: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//add
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case 'circle':
			this.branchcircle(item, lineIndex, collector, dm, document);
			return;

		case '<from: x y z>':
			this.branchfrom(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	}

	branchcircle(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//circle
		if (word == undefined) {
			//MISSING ERROR
		}

		//<center: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<radius: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[name: string]
		if (word == undefined) {
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchfrom(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<from: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<to: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[name: string]
		if (word == undefined) {
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	}
}

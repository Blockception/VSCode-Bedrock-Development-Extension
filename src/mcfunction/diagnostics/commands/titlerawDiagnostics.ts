import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class titlerawDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<player: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		switch(item.text) {
		case 'clear':
			this.branchclear(item, lineIndex, collector, dm, document);
			return;

		case 'reset':
			this.branchreset(item, lineIndex, collector, dm, document);
			return;

		case '<title|subtitle|actionbar>':
			this.branchtitle_subtitle_actionbar(item, lineIndex, collector, dm, document);
			return;

		case 'times':
			this.branchtimes(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchclear(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//clear
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchreset(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//reset
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchtitle_subtitle_actionbar(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<title|subtitle|actionbar>
		if (word == undefined) {
			//MISSING ERROR
		}

		//{ "rawtext": [ { "text": "" }, "", { "translate": "" } ] }
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchtimes(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//times
		if (word == undefined) {
			//MISSING ERROR
		}

		//<fadeIn: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<stay: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<fadeOut: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	}

}

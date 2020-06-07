import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class spreadplayersDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<x: value>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<z: value>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<spreadDistance: float>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.floatDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<maxRange: float>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.floatDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<victim: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}

}

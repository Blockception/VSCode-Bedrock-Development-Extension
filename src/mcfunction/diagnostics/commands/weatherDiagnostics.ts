import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class weatherDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<clear|rain|thunder>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[duration: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

	}

}

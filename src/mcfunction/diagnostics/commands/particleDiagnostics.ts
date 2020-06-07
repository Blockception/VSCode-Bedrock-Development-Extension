import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class particleDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<effect: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser(word, lineIndex, collector, dm, document);

		//<position: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

	}

}

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class tellrawDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<player>
		if (word == undefined) {
			//MISSING ERROR
		}

		//{ "rawtext": [ { "text": "" }, "", { "translate": "" } ] }
		if (word == undefined) {
			//MISSING ERROR
		}

	}

}

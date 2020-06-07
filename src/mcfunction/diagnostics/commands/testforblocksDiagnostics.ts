import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class testforblocksDiagnosticProvider implements DiagnosticProvider {

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

		//[masked|all]
		if (word == undefined) {
			return;
		}

	}

}

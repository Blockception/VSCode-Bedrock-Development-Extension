import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class ConnectDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var Uri = item.Child;

		//<serverUri: text>
		if (Uri == undefined) {
			Errors.Missing('uri', 'connect', lineIndex, item, collector);
			return;
		}
	}
}

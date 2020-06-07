import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class DaylockDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Child = item.Child;

		//[lock: Boolean]
		if (Child == undefined) {
			return;
		}

		dm.BooleanDiagnoser?.provideDiagnostic(Child, lineIndex, collector, dm, document);
	}

}

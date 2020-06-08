import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class KillDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var target = item.Child;

		//<player: target>
		if (target == undefined) {
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(target, lineIndex, collector, dm, document);

	}

}

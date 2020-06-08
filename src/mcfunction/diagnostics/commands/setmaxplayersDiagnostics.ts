import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class SetmaxplayersDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Count = item.Child;

		//<maxPlayers: int>
		if (Count == undefined) {
			Errors.Missing('integer', 'setmaxplayers', lineIndex, item, collector);
			return;
		}

		dm.IntegerDiagnoser?.provideDiagnostic(Count, lineIndex, collector, dm, document);
	}
}

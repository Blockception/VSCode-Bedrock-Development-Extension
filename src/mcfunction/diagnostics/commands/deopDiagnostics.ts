import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class DeopDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Child = item.Child;

		//<player: target>
		if (Child == undefined) {
			collector.push(new vscode.Diagnostic(
				new vscode.Range(lineIndex, item.Text.endindex + 1, lineIndex, item.Text.endindex + 2),
				"expecting a target/selector for the deop command"
			));
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Child, lineIndex, collector, dm, document);
	}

}

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class TellDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var target = item.Child;

		//<player: target>
		if (target == undefined) {
			Errors.Missing('target/selector', 'tell', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(target, lineIndex, collector, dm, document);

		var Message = target.Child;

		//<message: message>
		if (Message == undefined) {
			Errors.Missing('string', 'tell', lineIndex, target, collector);
			return;
		}

		dm.StringDiagnoser?.provideDiagnostic(Message, lineIndex, collector, dm, document);
	}

}

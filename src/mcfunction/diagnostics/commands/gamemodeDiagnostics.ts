import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class gamemodeDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<0|1|2|s|d|c|a|adventure|creative|default|survival>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[player: target]
		if (word == undefined) {
			return;
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

	}

}

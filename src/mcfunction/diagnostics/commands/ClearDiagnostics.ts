import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class clearDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//[player: target]
		if (word == undefined) {
			return;
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

		//[itemName: Item]
		if (word == undefined) {
			return;
		}
		dm.ItemDiagnoser(word, lineIndex, collector, dm, document);

		//[data: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

		//[maxCount: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

	}

}

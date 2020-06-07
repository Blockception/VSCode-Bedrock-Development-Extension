import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class enchantDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<player: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser(word, lineIndex, collector, dm, document);

		//<int|Enchant Name>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[level: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

	}

}

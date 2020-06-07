import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class setmaxplayersDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<maxPlayers: int>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.IntegerDiagnoser(word, lineIndex, collector, dm, document);

	}

}

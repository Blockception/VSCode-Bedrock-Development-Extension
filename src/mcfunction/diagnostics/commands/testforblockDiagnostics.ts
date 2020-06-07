import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class testforblockDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<position: x y z>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<tileName: Block>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.BlockDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[dataValue: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}

}

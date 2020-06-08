import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class setblockDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<position: x y z>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

		//<tileName: Block>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.BlockDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[tileData: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[replace|destroy|keep]
		if (word == undefined) {
			return;
		}

	}

}

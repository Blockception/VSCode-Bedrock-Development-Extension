import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class TestforBlockDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<position: x y z>
		var Out = Functions.provideDiagnosticsXYZ('testforblock', item, lineIndex, collector, dm, document);

		if (Out[1] == false) {
			return;
		}

		var Block = item.Child;

		//<tileName: Block>
		if (Block == undefined) {
			Errors.Missing('block', 'testforblock', lineIndex, Out[0], collector);
			return;
		}
		dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

		var Data = Block.Child;

		//[dataValue: int]
		if (Data == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

	}

}

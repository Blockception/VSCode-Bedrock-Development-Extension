import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class SetblockDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<position: x y z>
		var Out = Functions.provideDiagnosticsXYZ('setblock', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		var Block = Out[0].Child;

		//<tileName: Block>
		if (Block == undefined) {
			Errors.Missing('block', 'setblock', lineIndex, Out[0], collector);
			return;
		}
		dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

		var Data = Block.Child;

		//[tileData: int]
		if (Data == undefined) {
			return;
		}

		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

		var Mode = Data.Child;

		//[replace|destroy|keep]
		if (Mode == undefined) {
			return;
		}

		switch(Mode.Text.text){
			case 'replace': 
			case 'destroy': 
			case 'keep':
				return;
			default:
				Errors.UnknownWords('replace, destroy, keep', lineIndex, Mode, collector);
				return;
		}
	}
}

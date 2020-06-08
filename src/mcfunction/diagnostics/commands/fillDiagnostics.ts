import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class FillDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//from x y z
		var Out = Functions.provideDiagnosticsXYZ('fill', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		//<to: x y z>
		Out = Functions.provideDiagnosticsXYZ('fill', Out[0], lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;
		
		var Block = Out[0].Child;

		//<tileName: Block>
		if (Block == undefined) {
			Errors.Missing('block', 'fill', lineIndex, Out[0], collector);
			return;
		}

		dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

		var Data = Block.Child;

		//optional
		if (Data == undefined)
			return;

		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

		var Mode = Data.Child;

		//optional
		if (Mode == undefined)
			return;

		switch(Mode.Text.text)	{
			case 'outline':
			case 'hollow':
			case 'destroy':
			case 'keep':
				return;
				
			case 'replace':
				this.branchReplace(Mode, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('outline, hollow, destroy, keep, replace', lineIndex, Mode, collector);
				return;
		}
	}

	branchReplace(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Block = item.Child;

		//<tileName: Block>
		if (Block == undefined) {
			return;
		}

		dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

		var Data = Block.Child;

		//optional
		if (Data == undefined)
			return;

		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);
	}

}

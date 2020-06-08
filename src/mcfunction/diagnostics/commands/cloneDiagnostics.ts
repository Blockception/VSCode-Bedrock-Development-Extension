import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class CloneDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		
		//begin x y z
		var out = Functions.provideDiagnosticsXYZ('clone', item, lineIndex, collector, dm, document);

		if (out[1] == false){
			return;
		}

		//end x y z
		out = Functions.provideDiagnosticsXYZ('clone', out[0], lineIndex, collector, dm, document);

		if (out[1] == false){
			return;
		}

		//destination x y z
		out = Functions.provideDiagnosticsXYZ('clone', out[0], lineIndex, collector, dm, document);

		if (out[1] == false){
			return;
		}
		
		var mode = out[0].Child;

		if (mode == undefined){
			return;
		}

		switch(mode.Text.text) {
		case 'masked':
		case 'replace':
			this.branchreplace_masked(mode, lineIndex, collector, dm, document);
			return;

		case 'filtered':
			this.branchfiltered(mode, lineIndex, collector, dm, document);
			return;

		default:
			Errors.UnknownWords('masked, replace, filtered', lineIndex, mode, collector);
			return;
		}
	}

	//Diagnostics when the branch Replace|Masked is taken
	branchreplace_masked(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var mode = item.Child;
		if (mode == undefined){
			return;
		}

		switch(mode.Text.text) {
		case 'normal':
		case 'force':
		case 'move':
			return;
		default:
			Errors.UnknownWords('normal, force, move', lineIndex, mode, collector);
			return;
		}
	}

	//Diagnostics when the branch Filtered is taken
	branchfiltered(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var mode = item.Child;
		if (mode == undefined){
			Errors.Missing('clone mode', 'clone', lineIndex, item, collector);
			return;
		}

		switch(mode.Text.text) {
		case 'normal':
		case 'force':
		case 'move':
			break;
		default:
			Errors.UnknownWords('normal, force, move', lineIndex, mode, collector);
			return;
		}

		var block = mode.Child;

		//<tileName: Block>
		if (block == undefined) {
			Errors.Missing('block', 'clone', lineIndex, mode, collector);
			return;
		}
		dm.BlockDiagnoser?.provideDiagnostic(block, lineIndex, collector, dm, document);

		var blockData = block.Child;

		//<tileData: int>
		if (blockData == undefined) {
			Errors.Missing('integer', 'clone', lineIndex, block, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(blockData, lineIndex, collector, dm, document);
	}
}

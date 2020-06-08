import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class DifficultyDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Difficulty = item.Child;

		//<peaceful|easy|normal|hard|e|h|n|p|0|1|2|3>
		if (Difficulty == undefined) {
			Errors.Missing('difficulty', 'difficulty', lineIndex, item, collector);
			return;
		}

		switch(Difficulty.Text.text){
			case 'peaceful': 
			case 'easy': 
			case 'normal': 
			case 'hard': 
			case 'e': 
			case 'h': 
			case 'n': 
			case 'p': 
			case '0': 
			case '1': 
			case '2': 
			case '3':
				return;
			default:
				Errors.UnknownWords('peaceful, easy, normal, hard, e, h, n, p, 0, 1, 2, 3', lineIndex, Difficulty, collector);
		}
	}
}

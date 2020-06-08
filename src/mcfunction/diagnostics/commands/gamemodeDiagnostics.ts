import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class GamemodeDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Gamemode = item.Child;

		//<0|1|2|s|d|c|a|adventure|creative|default|survival>
		if (Gamemode == undefined) {
			Errors.Missing('gamemode', 'gamemode', lineIndex, item, collector);
			return;
		}

		switch (Gamemode.Text.text) {
			case '0':
			case '1':
			case '2':
			case 's':
			case 'd':
			case 'c':
			case 'a':
			case 'adventure':
			case 'creative':
			case 'default':
			case 'survival':
				break;
				
			default:
				Errors.UnknownWords('0, 1, 2, s, d, c, a, adventure, creative, default, survival', lineIndex, Gamemode, collector);
				return;
		}

		var Target = Gamemode.Child;

		//[player: target]
		if (Target == undefined) {
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);
	}

}

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class playsoundDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<sound: string>
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[player: target]
		if (word == undefined) {
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[position: x y z]
		if (word == undefined) {
			return;
		}

		//[volume: float]
		if (word == undefined) {
			return;
		}
		dm.floatDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[pitch: float]
		if (word == undefined) {
			return;
		}
		dm.floatDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[minimumVolume: float]
		if (word == undefined) {
			return;
		}
		dm.floatDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}

}

import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class StopsoundDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Target = item.Child;

		//<player: target>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'stopsound', lineIndex, item, collector);
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var Sound = Target.Child;

		//[sound: string]
		if (Sound == undefined) {
			return;
		}
		dm.SoundDiagnoser?.provideDiagnostic(Sound, lineIndex, collector, dm, document);

	}

}

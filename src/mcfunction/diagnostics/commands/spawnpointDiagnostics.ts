import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class SpawnpointDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Target = item.Child;

		//[player: target]
		if (Target == undefined) {
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var XCoord = Target.Child;

		//[position: x y z]
		if (XCoord == undefined) {
			return;
		}

		if (XCoord.Text.text != "~~~") {
			dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);

			var YCoord = XCoord.Child;

			//[position: x y z]
			if (YCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

			var ZCoord = YCoord.Child;

			//[position: x y z]
			if (ZCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);
		}

	}

}

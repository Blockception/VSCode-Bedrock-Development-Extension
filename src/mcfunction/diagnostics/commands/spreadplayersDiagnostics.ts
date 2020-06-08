import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class SpreadPlayersDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var XCoord = item.Child;

		//<x: value>
		if (XCoord == undefined) {
			Errors.Missing('coordinate', 'spreadplayers', lineIndex, item, collector);
			return;
		}

		dm?.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);
		var ZCoord = XCoord.Child;

		//<z: value>
		if (ZCoord == undefined) {
			Errors.Missing('coordinate', 'spreadplayers', lineIndex, XCoord, collector);
			return;
		}

		dm?.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);

		var SpreadDis = ZCoord.Child;

		//<spreadDistance: float>
		if (SpreadDis == undefined) {
			Errors.Missing('float', 'spreadplayers', lineIndex, ZCoord, collector);
			return;
		}
		dm.FloatDiagnoser?.provideDiagnostic(SpreadDis, lineIndex, collector, dm, document);

		var MaxRange = SpreadDis.Child;

		//<maxRange: float>
		if (MaxRange == undefined) {
			Errors.Missing('float', 'spreadplayers', lineIndex, SpreadDis, collector);
			return;
		}
		dm.FloatDiagnoser?.provideDiagnostic(MaxRange, lineIndex, collector, dm, document);

		var Target = MaxRange.Child;

		//<victim: target>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'spreadplayers', lineIndex, MaxRange, collector);
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

	}

}

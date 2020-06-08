import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class EffectDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Target = item.Child;

		//<player: target>
		if (Target == undefined) {
			Errors.Missing('target', 'effect', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var Next = Target.Child;

		if (Next == undefined) {
			Errors.Missing('effect | clear', 'effect', lineIndex, Target, collector);
			return;
		}

		if (Next.Text.text == "clear") {
			return;
		}

		this.brancheffect(item, lineIndex, collector, dm, document);
		return;
	}

	//When an effect has been specified
	brancheffect(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		dm.EffectDiagnoser?.provideDiagnostic(item, lineIndex, collector, dm, document);

		var Seconds = item.Child;

		//[seconds: int]
		if (Seconds == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Seconds, lineIndex, collector, dm, document);

		var amplifier = Seconds.Child;

		//[amplifier: int]
		if (amplifier == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(amplifier, lineIndex, collector, dm, document);

		var HideParticles = amplifier.Child;

		//[hideParticles: Boolean]
		if (HideParticles == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(HideParticles, lineIndex, collector, dm, document);

	}
}

import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class TitleDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Target = item.Child;

		//<player: target>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'title', lineIndex, item, collector);
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		switch (Target.Text.text) {
			case 'reset':
			case 'clear':
				return;

			case 'title':
			case 'subtitle':
			case 'actionbar':
				this.branchTitle_Subtitle_Actionbar(item, lineIndex, collector, dm, document);
				return;

			case 'times':
				this.branchtimes(item, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('actionbar, clear, reset, title, subtitle, times', lineIndex, Target, collector);
				return;
		}
	}

	branchTitle_Subtitle_Actionbar(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Message = item.Child;

		//<titleText: message>
		if (Message == undefined) {
			Errors.Missing('string', 'title', lineIndex, item, collector);
			return;
		}

		dm.StringDiagnoser?.provideDiagnostic(item, lineIndex, collector, dm, document);
	}

	branchtimes(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var FadeIn = item.Child;

		//<fadeIn: int>
		if (FadeIn == undefined) {
			Errors.Missing('integer', 'title', lineIndex, item, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(FadeIn, lineIndex, collector, dm, document);

		var stay = FadeIn.Child;

		//<stay: int>
		if (stay == undefined) {
			Errors.Missing('integer', 'title', lineIndex, FadeIn, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(stay, lineIndex, collector, dm, document);

		var fadeOut = FadeIn.Child;

		//<fadeOut: int>
		if (fadeOut == undefined) {
			Errors.Missing('integer', 'title', lineIndex, stay, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(fadeOut, lineIndex, collector, dm, document);

	}
}
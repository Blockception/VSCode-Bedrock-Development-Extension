import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class TitlerawDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Target = item.Child;

		//<player: target>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'titleraw', lineIndex, item, collector);
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
			Errors.Missing('json', 'titleraw', lineIndex, item, collector);
			return;
		}

		dm.JsonTextDiagnoser?.provideDiagnostic(item, lineIndex, collector, dm, document);
	}

	branchtimes(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var FadeIn = item.Child;

		//<fadeIn: int>
		if (FadeIn == undefined) {
			Errors.Missing('integer', 'titleraw', lineIndex, item, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(FadeIn, lineIndex, collector, dm, document);

		var stay = FadeIn.Child;

		//<stay: int>
		if (stay == undefined) {
			Errors.Missing('integer', 'titleraw', lineIndex, FadeIn, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(stay, lineIndex, collector, dm, document);

		var fadeOut = FadeIn.Child;

		//<fadeOut: int>
		if (fadeOut == undefined) {
			Errors.Missing('integer', 'titleraw', lineIndex, fadeOut, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(fadeOut, lineIndex, collector, dm, document);

	}
}
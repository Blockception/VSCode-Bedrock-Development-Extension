import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class TagDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Target = item.Child;

		//<targets>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'Tag', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var Mode = Target.Child

		if (Mode == undefined) {
			Errors.Missing('add | remove | list', 'Tag', lineIndex, Target, collector);
			return;
		}

		switch (Mode.Text.text) {
			case 'list':
				return;

			case 'add':
			case 'remove':
				var Tag = Mode.Child;

				if (Tag == undefined){
					Errors.Missing('tag', 'tag', lineIndex, Target, collector);
					return;
				}

				dm.TagDiagnoser?.provideDiagnostic(Tag, lineIndex, collector, dm, document);

				return;

			default:
				Errors.UnknownWords('add, remove, list', lineIndex, Mode, collector);
				return;
		}
	}
}
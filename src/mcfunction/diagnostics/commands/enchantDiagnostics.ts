import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class EnchantDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Target = item.Child;

		//<player: target>
		if (Target == undefined) {
			Errors.Missing('target', 'enchant', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var Enchant = Target.Child;

		//<int|Enchant Name>
		if (Enchant == undefined) {
			Errors.Missing('enchant|int', 'enchant <target>', lineIndex, item, collector);
			return;
		}

		var Level = Enchant.Child;

		//[level: int]
		if (Level == undefined) {
			return;
		}

		dm.IntegerDiagnoser?.provideDiagnostic(Level, lineIndex, collector, dm, document);
	}
}

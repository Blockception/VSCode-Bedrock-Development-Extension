import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem, RangedWord } from '../../../general/include';

export class XpDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var Amount = item.Child;

		if (Amount == undefined){
			Errors.Missing('xp', 'xp', lineIndex, item, collector);
			return;
		}

		var value = new RangedWord(Amount.Text.text, Amount.Text.startindex, Amount.Text.endindex);

		if (value.text.endsWith("L") || value.text.endsWith("l")){
			value.text = value.text.substring(0, value.text.length - 1);
			value.endindex -= 1;
		}

		var ValueAmount = new SyntaxItem(value, Amount.Child);
		dm.IntegerDiagnoser?.provideDiagnostic(ValueAmount, lineIndex, collector, dm, document);

		var Target = Amount.Child;

		//optional
		if (Target == undefined)
			return;

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);
	}
}

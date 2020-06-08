import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class GiveDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var target = item.Child;

		//<player: target>
		if (target == undefined) {
			Errors.Missing('target/selector', 'give', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(target, lineIndex, collector, dm, document);

		var Item = target.Child;

		//<itemName: Item>
		if (Item == undefined) {
			Errors.Missing('item', 'give', lineIndex, target, collector);
			return;
		}
		dm.ItemDiagnoser?.provideDiagnostic(Item, lineIndex, collector, dm, document);

		var Amount = Item.Child;

		//[amount: int]
		if (Amount == undefined) {
			return;
		}
		
		dm.IntegerDiagnoser?.provideDiagnostic(Amount, lineIndex, collector, dm, document);

		var Data = Amount.Child;

		//[data: int]
		if (Data == undefined) {
			return;
		}

		dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

		var Components = item.Child;

		//[components: json]
		if (Components == undefined){
			return;
		}

		var object = JSON.parse(Components.Text.text);

		for (var jproperty in object){
			switch(jproperty){
				case 'minecraft:can_destroy':
				case 'minecraft:can_place_on':
					break;
				default:
					collector.push(new vscode.Diagnostic(
						Components.Text.ToRange(lineIndex),
						"unknown json property, expected: minecraft:can_place_on, or minecraft:can_destroy",
						vscode.DiagnosticSeverity.Error
					));
					break;
			}
		}
	
	}

}

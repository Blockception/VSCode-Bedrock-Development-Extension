import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class ClearDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Player = item.Child;

		//[player: target]
		if (Player == undefined) {
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Player, lineIndex, collector, dm, document);

		var Item = item.Child;

		//[itemName: Item]
		if (Item == undefined) {
			return;
		}
		dm.ItemDiagnoser?.provideDiagnostic(Item, lineIndex, collector, dm, document);

		var ItemData = Item.Child;

		//[data: int]
		if (ItemData == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(ItemData, lineIndex, collector, dm, document);

		var MaxCount = Item.Child;

		//[maxCount: int]
		if (MaxCount == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(MaxCount, lineIndex, collector, dm, document);

	}

}

import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class ReplaceItemDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var Mode = item.Child;

		if (Mode == undefined){
			Errors.Missing('block | entity', 'replaceitem', lineIndex, item, collector);
			return;
		}


		switch(Mode.Text.text) {
		case 'block':
			this.branchblock(item, lineIndex, collector, dm, document);
			return;

		case 'entity':
			this.branchentity(item, lineIndex, collector, dm, document);
			return;

		default:
			Errors.UnknownWords('entity, block', lineIndex, Mode, collector);
			return;
		}

	}

	branchblock(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<position: x y z>
		var Out = Functions.provideDiagnosticsXYZ('replaceitem', item, lineIndex, collector, dm, document);

		if (Out[1] == false)
			return;

		var slot = Out[0].Child;

		//slot.container
		if (slot == undefined) {
			Errors.Missing('slot.container', 'replaceitem', lineIndex, Out[0], collector);
			return;
		}

		//TODO check slot containers

		this.branchMerged(slot,lineIndex, collector, dm, document);
	}

	branchentity(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {
		var Target = item.Child;

		//<target: target>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'replaceitem', lineIndex, item, collector);
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var slot = Target.Child;

		//<slotType: EntityEquipmentSlot>
		if (slot == undefined) {
			Errors.Missing('entity slot', 'replaceitem', lineIndex, Target, collector);
			return;
		}

		//TODO entity slot

		this.branchMerged(slot ,lineIndex, collector, dm, document);
	}

	branchMerged(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void{

		var SlotID = item.Child;

		//<slotId: int>
		if (SlotID == undefined) {
			Errors.Missing('integer', 'replaceitem', lineIndex, item, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(SlotID, lineIndex, collector, dm, document);

		var Item = SlotID.Child;

		//<itemName: Item>
		if (Item == undefined) {
			Errors.Missing('item', 'replaceitem', lineIndex, SlotID, collector);
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

		var components = Data.Child;

		//[components: json]
		if (components == undefined) {
			return;
		}

		dm.JsonItemComponentDiagnoser?.provideDiagnostic(components, lineIndex, collector, dm, document);
	}
}

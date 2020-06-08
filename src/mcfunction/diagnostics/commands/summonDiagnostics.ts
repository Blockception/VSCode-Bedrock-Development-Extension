import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class SummonDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var EntityType = item.Child;

		//<entityType: EntityType>
		if (EntityType == undefined) {
			Errors.Missing('entity type', 'summon', lineIndex, item, collector);
			return;
		}

		dm.EntityDiagnoser?.provideDiagnostic(EntityType, lineIndex, collector, dm, document);

		var Next = EntityType.Child;

		if (Next == undefined)
			return;

		var NextText = Next.Text.text;
		var FirstChar = NextText.charAt(0);

		switch (FirstChar) {
			case '-':
			case '+':
			case '.':
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '~':
			case '^':
				this.branchspawnPos(Next, lineIndex, collector, dm, document);
				return;

			default:
			case '"':
				this.branchnameTag(Next, lineIndex, collector, dm, document);
				return;
		}
	}

	branchspawnPos(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var XCoord = item;

		//[position: x y z]
		if (XCoord == undefined) {
			return;
		}

		var SpawnEvent: SyntaxItem | undefined;
		if (XCoord.Text.text != "~~~") {
			dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);

			var YCoord = XCoord.Child;

			//[position: x y z]
			if (YCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

			var ZCoord = YCoord.Child;

			//[position: x y z]
			if (ZCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);

			SpawnEvent = ZCoord.Child;
		}
		else {
			SpawnEvent = XCoord.Child;
		}

		//[spawnEvent: string]
		if (SpawnEvent == undefined) {
			return;
		}
		//TODO Event trigger?

		var Name = SpawnEvent.Child;

		//[nameTag: string]
		if (Name == undefined) {
			return;
		}

		dm.StringDiagnoser?.provideDiagnostic(Name, lineIndex, collector, dm, document);
	}


	branchnameTag(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var XCoord = item.Child;

		//[position: x y z]
		if (XCoord == undefined) {
			return;
		}

		if (XCoord.Text.text != "~~~") {
			dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);

			var YCoord = XCoord.Child;

			//[position: x y z]
			if (YCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

			var ZCoord = YCoord.Child;

			//[position: x y z]
			if (ZCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);

		}
	}
}


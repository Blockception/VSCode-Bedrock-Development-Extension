import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class summonDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<entityType: EntityType>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.EntityDiagnoser(word, lineIndex, collector, dm, document);

		switch(item.text) {
		case '[spawnPos: x y z]':
			this.branchspawnPos(item, lineIndex, collector, dm, document);
			return;

		case '<nameTag: string>':
			this.branchnameTag(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchspawnPos(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//[spawnPos: x y z]
		if (word == undefined) {
			return;
		}

		//[spawnEvent: string]
		if (word == undefined) {
			return;
		}
		dm.StringDiagnoser(word, lineIndex, collector, dm, document);

		//[nameTag: string]
		if (word == undefined) {
			return;
		}
		dm.StringDiagnoser(word, lineIndex, collector, dm, document);

	}
	branchnameTag(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<nameTag: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser(word, lineIndex, collector, dm, document);

		//[spawnPos: x y z]
		if (word == undefined) {
			return;
		}

	}
	}

}

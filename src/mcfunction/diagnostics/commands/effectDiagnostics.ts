import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class effectDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<player: target>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		switch(item.text) {
		case '<effect: Effect>':
			this.brancheffect(item, lineIndex, collector, dm, document);
			return;

		case 'clear':
			this.branchclear(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	brancheffect(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<effect: Effect>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.EffectDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[seconds: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[amplifier: int]
		if (word == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[hideParticles: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchclear(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//clear
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	}

}

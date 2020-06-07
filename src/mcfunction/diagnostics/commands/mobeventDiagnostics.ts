import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class mobeventDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'minecraft:pillager_patrols_event':
			this.branchminecraft(item, lineIndex, collector, dm, document);
			return;

		case 'wandering_trader_event':
			this.branchwandering_trader_event(item, lineIndex, collector, dm, document);
			return;

		case 'events_enabled':
			this.branchevents_enabled(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchminecraft(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//minecraft:pillager_patrols_event
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchwandering_trader_event(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//wandering_trader_event
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchevents_enabled(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//events_enabled
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
}

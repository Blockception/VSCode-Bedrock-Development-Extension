import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class MobeventDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var event = item.Child;

		if (event == undefined){
			Errors.Missing('event', 'mobevent', lineIndex, item, collector);
			return
		}

		switch(event.Text.text) {
		case 'minecraft:pillager_patrols_event':
		case 'wandering_trader_event':
		case 'events_enabled':
			var Value = event.Child;

			if (Value == undefined){
				return;
			}

			dm.BooleanDiagnoser?.provideDiagnostic(Value, lineIndex, collector, dm, document);

			return;
		default:
			Errors.UnknownWords('minecraft:pillager_patrols_event, wandering_trader_event, events_enabled', lineIndex, event, collector);
			return;
		}
	}
}

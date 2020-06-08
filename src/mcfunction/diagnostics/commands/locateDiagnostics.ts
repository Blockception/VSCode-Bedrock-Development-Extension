import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class LocateDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var structure = item.Child;

		if (structure == undefined){
			Errors.Missing('structure', 'locate', lineIndex, item, collector);
			return
		}

		switch(structure.Text.text) {
		case 'buriedtreasure':
		case 'endcity':
		case 'fortress':
		case 'mansion':
		case 'mineshaft':
		case 'monument':
		case 'ruins':
		case 'shipwreck':
		case 'stronghold':
		case 'temple':
		case 'village':
		case 'pillageroutpost':
			return;
			
		default:
			Errors.UnknownWords('locate', 'see the wiki', lineIndex, structure, collector);
			return;
		}

	}
}

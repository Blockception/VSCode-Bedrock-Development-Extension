import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors, Functions } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class TestforBlocksDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<begin: x y z>
		var Out = Functions.provideDiagnosticsXYZ('testforblock', item, lineIndex, collector, dm, document);

		if (Out[1] == false) {
			return;
		}

		//<end: x y z>
		var Out = Functions.provideDiagnosticsXYZ('testforblock', Out[0], lineIndex, collector, dm, document);

		if (Out[1] == false) {
			return;
		}

		//<destination: x y z>
		var Out = Functions.provideDiagnosticsXYZ('testforblock', Out[0], lineIndex, collector, dm, document);

		if (Out[1] == false) {
			return;
		}

		var Mode = Out[0].Child;

		//[masked|all]
		if (Mode == undefined) {
			return;
		}

		switch(Mode.Text.text){
			case 'masked':
			case 'all':
				return;

			default:
				Errors.UnknownWords('all, masekd', lineIndex, Mode, collector);
		}

	}

}

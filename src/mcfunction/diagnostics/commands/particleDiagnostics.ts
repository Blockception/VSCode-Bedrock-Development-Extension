import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';
import { Functions } from '../DiagnosticsFunctions';

export class ParticleDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		var Particle = item.Child;

		//<effect: string>
		if (Particle == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, item, collector);
			return;
		}

		dm.ParticleDiagnoser?.provideDiagnostic(Particle, lineIndex, collector, dm, document);

		//x y z
		Functions.provideDiagnosticsXYZ('particle', Particle, lineIndex, collector, dm, document);
	}

}

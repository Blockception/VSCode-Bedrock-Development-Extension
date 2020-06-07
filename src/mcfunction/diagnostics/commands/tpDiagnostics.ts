import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class tpDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case '<target>':
			this.branchtarget(item, lineIndex, collector, dm, document);
			return;

		case '<x y z|destination>':
			this.branchx y z_destination(item, lineIndex, collector, dm, document);
			return;

		case '<x y z|target>':
			this.branchx y z_target(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchtarget(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<target>
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case '<x y z|destination>':
			this.branchx y z_destination(item, lineIndex, collector, dm, document);
			return;

		case '<x y z|target>':
			this.branchx y z_target(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	}

	branchx y z_destination(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<x y z|destination>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[yRot: value]
		if (word == undefined) {
			return;
		}

		//[xRot: value]
		if (word == undefined) {
			return;
		}

		//[checkForBlocks: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchx y z_target(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<x y z|target>
		if (word == undefined) {
			//MISSING ERROR
		}

		//facing
		if (word == undefined) {
			//MISSING ERROR
		}

		//<lookAtEntity: target|x y z>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[checkForBlocks: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	}
	branchx y z_destination(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<x y z|destination>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[yRot: value]
		if (word == undefined) {
			return;
		}

		//[xRot: value]
		if (word == undefined) {
			return;
		}

		//[checkForBlocks: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchx y z_target(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<x y z|target>
		if (word == undefined) {
			//MISSING ERROR
		}

		//facing
		if (word == undefined) {
			//MISSING ERROR
		}

		//<lookAtEntity: target|x y z>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.SelectorDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[checkForBlocks: Boolean]
		if (word == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
}

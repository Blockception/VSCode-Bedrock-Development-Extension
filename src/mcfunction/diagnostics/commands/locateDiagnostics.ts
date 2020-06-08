import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class locateDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'buriedtreasure':
			this.branchburiedtreasure(item, lineIndex, collector, dm, document);
			return;

		case 'endcity':
			this.branchendcity(item, lineIndex, collector, dm, document);
			return;

		case 'fortress':
			this.branchfortress(item, lineIndex, collector, dm, document);
			return;

		case 'mansion':
			this.branchmansion(item, lineIndex, collector, dm, document);
			return;

		case 'mineshaft':
			this.branchmineshaft(item, lineIndex, collector, dm, document);
			return;

		case 'monument':
			this.branchmonument(item, lineIndex, collector, dm, document);
			return;

		case 'ruins':
			this.branchruins(item, lineIndex, collector, dm, document);
			return;

		case 'shipwreck':
			this.branchshipwreck(item, lineIndex, collector, dm, document);
			return;

		case 'stronghold':
			this.branchstronghold(item, lineIndex, collector, dm, document);
			return;

		case 'temple':
			this.branchtemple(item, lineIndex, collector, dm, document);
			return;

		case 'village':
			this.branchvillage(item, lineIndex, collector, dm, document);
			return;

		case 'pillageroutpost':
			this.branchpillageroutpost(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchburiedtreasure(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//buriedtreasure
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchendcity(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//endcity
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchfortress(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//fortress
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchmansion(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//mansion
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchmineshaft(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//mineshaft
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchmonument(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//monument
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchruins(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//ruins
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchshipwreck(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//shipwreck
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchstronghold(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//stronghold
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchtemple(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//temple
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchvillage(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//village
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
	branchpillageroutpost(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//pillageroutpost
		if (word == undefined) {
			Errors.Missing('TODO Type', 'TODO Path', lineIndex, Out[0], collector);
			return;
		}

	}
}

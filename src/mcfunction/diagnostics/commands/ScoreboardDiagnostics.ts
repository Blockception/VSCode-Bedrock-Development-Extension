import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class scoreboardDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'objectives':
			this.branchobjectives(item, lineIndex, collector, dm, document);
			return;

		case 'players':
			this.branchplayers(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchobjectives(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//objectives
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case 'list':
			this.branchlist(item, lineIndex, collector, dm, document);
			return;

		case 'add':
			this.branchadd(item, lineIndex, collector, dm, document);
			return;

		case 'remove':
			this.branchremove(item, lineIndex, collector, dm, document);
			return;

		case 'setdisplay':
			this.branchsetdisplay(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	}

	branchlist(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//list
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//add
		if (word == undefined) {
			//MISSING ERROR
		}

		//<name>
		if (word == undefined) {
			//MISSING ERROR
		}

		//dummy
		if (word == undefined) {
			//MISSING ERROR
		}

		//[display name: string]
		if (word == undefined) {
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

	}
	branchremove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//remove
		if (word == undefined) {
			//MISSING ERROR
		}

		//<name>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchsetdisplay(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//setdisplay
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case '<slot>':
			this.branchslot(item, lineIndex, collector, dm, document);
			return;

		case 'belowname':
			this.branchbelowname(item, lineIndex, collector, dm, document);
			return;

		case 'list':
			this.branchlist(item, lineIndex, collector, dm, document);
			return;

		case 'sidebar':
			this.branchsidebar(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	}

	branchslot(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<slot>
		if (word == undefined) {
			//MISSING ERROR
		}

		//[objective]
		if (word == undefined) {
			return;
		}

	}
	branchbelowname(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//belowname
		if (word == undefined) {
			//MISSING ERROR
		}

		//[objective]
		if (word == undefined) {
			return;
		}

	}
	branchlist(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//list
		if (word == undefined) {
			//MISSING ERROR
		}

		//[objective]
		if (word == undefined) {
			return;
		}

	}
	branchsidebar(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//sidebar
		if (word == undefined) {
			//MISSING ERROR
		}

		//[objective]
		if (word == undefined) {
			return;
		}

	}
	}
	}
	branchplayers(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//players
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case 'list':
			this.branchlist(item, lineIndex, collector, dm, document);
			return;

		case 'set':
			this.branchset(item, lineIndex, collector, dm, document);
			return;

		case 'add':
			this.branchadd(item, lineIndex, collector, dm, document);
			return;

		case 'remove':
			this.branchremove(item, lineIndex, collector, dm, document);
			return;

		case 'reset':
			this.branchreset(item, lineIndex, collector, dm, document);
			return;

		case 'operation':
			this.branchoperation(item, lineIndex, collector, dm, document);
			return;

		case 'test':
			this.branchtest(item, lineIndex, collector, dm, document);
			return;

		case 'random':
			this.branchrandom(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	}

	branchlist(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//list
		if (word == undefined) {
			//MISSING ERROR
		}

		//[entity]
		if (word == undefined) {
			return;
		}

	}
	branchset(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//set
		if (word == undefined) {
			//MISSING ERROR
		}

		//<entity: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<score>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//add
		if (word == undefined) {
			//MISSING ERROR
		}

		//<entity: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<count>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchremove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//remove
		if (word == undefined) {
			//MISSING ERROR
		}

		//<entity: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<count>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchreset(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//reset
		if (word == undefined) {
			//MISSING ERROR
		}

		//<entity: string>
		if (word == undefined) {
			//MISSING ERROR
		}
		dm.StringDiagnoser?.provideDiagnostic(word, lineIndex, collector, dm, document);

		//[objective]
		if (word == undefined) {
			return;
		}

	}
	branchoperation(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//operation
		if (word == undefined) {
			//MISSING ERROR
		}

		//<targetName>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<targetObjective>
		if (word == undefined) {
			//MISSING ERROR
		}

		switch(item.text) {
		case '<operation>':
			this.branchoperation(item, lineIndex, collector, dm, document);
			return;

		case '%=':
			this.branch%=(item, lineIndex, collector, dm, document);
			return;

		case '*=':
			this.branch*=(item, lineIndex, collector, dm, document);
			return;

		case '+=':
			this.branch+=(item, lineIndex, collector, dm, document);
			return;

		case '-=':
			this.branch-=(item, lineIndex, collector, dm, document);
			return;

		case '/=':
			this.branch/=(item, lineIndex, collector, dm, document);
			return;

		case '< <selector> <objective>':
			this.branch<selector> <objective(item, lineIndex, collector, dm, document);
			return;

		case '=':
			this.branch=(item, lineIndex, collector, dm, document);
			return;

		case '> <selector> <objective>':
			this.branch<selector> <objective(item, lineIndex, collector, dm, document);
			return;

		case 'swap':
			this.branchswap(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}
	branchoperation(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//<operation>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch%=(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//%=
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch*=(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//*=
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch+=(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//+=
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch-=(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//-=
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch/=(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		///=
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch<selector> <objective(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//< <selector> <objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch=(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//=
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branch<selector> <objective(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//> <selector> <objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchswap(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//swap
		if (word == undefined) {
			//MISSING ERROR
		}

		//<selector>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	}
	branchtest(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//test
		if (word == undefined) {
			//MISSING ERROR
		}

		//<entity>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<min|*>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<max|*>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	branchrandom(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//random
		if (word == undefined) {
			//MISSING ERROR
		}

		//<entity>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<objective>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<min>
		if (word == undefined) {
			//MISSING ERROR
		}

		//<max>
		if (word == undefined) {
			//MISSING ERROR
		}

	}
	}
}

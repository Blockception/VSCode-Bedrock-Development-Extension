import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class TimeDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Mode = item.Child;

		if (Mode == undefined) {
			Errors.Missing('mode', 'time', lineIndex, item, collector);
			return;
		}

		switch (Mode.Text.text) {
			case 'add':
				this.branchadd(Mode, lineIndex, collector, dm, document);
				return;

			case 'set':
				this.branchset(Mode, lineIndex, collector, dm, document);
				return;

			case 'query':
				this.branchquery(Mode, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('add, set, query', lineIndex, Mode, collector);
				return;
		}

	}

	branchadd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Amount = item.Child;

		//<amount: int>
		if (Amount == undefined) {
			Errors.Missing('integer', 'time', lineIndex, item, collector);
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Amount, lineIndex, collector, dm, document);
	}

	branchset(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Amount = item.Child;

		//<amount: int>
		if (Amount == undefined) {
			Errors.Missing('integer | timespec', 'time', lineIndex, item, collector);
			return;
		}

		switch (Amount.Text.text.charAt(0)) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				//time integer
				dm.IntegerDiagnoser?.provideDiagnostic(Amount, lineIndex, collector, dm, document);
				return;

			default:
				//timespec
				switch (Amount.Text.text) {
					case 'day':
					case 'midnight':
					case 'noon':
					case 'sunrise':
					case 'sunset':
						return;
					default:
						Errors.UnknownWords('day, midnight, night, noon, sunrise, sunset', lineIndex, Amount, collector);
						return;
				}
		}
	}

	branchquery(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var mode = item.Child;

		//<daytime|gametime|day>
		if (mode == undefined) {
			Errors.Missing('daytime | gametime | day', 'time', lineIndex, item, collector);
			return;
		}

		switch(mode.Text.text){
			case 'daytime': 
			case 'gametime': 
			case'day':
				return;
			default:
				Errors.UnknownWords('daytime | gametime | day', lineIndex, mode, collector);
		}

	}
}

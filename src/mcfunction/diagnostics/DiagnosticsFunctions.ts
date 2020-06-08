import * as vscode from 'vscode';
import { SyntaxTree, SyntaxItem, RangedWord } from '../../general/include';
import { DiagnosticsManager } from './DiagnosticsManager';
import { doesNotReject } from 'assert';

export module Errors {

    export function Missing(type : string, command : string, lineIndex : number, parent : SyntaxItem, collector: vscode.Diagnostic[]) : void {
        collector.push(new vscode.Diagnostic(
            new vscode.Range(lineIndex, parent.Text.endindex + 1, lineIndex, parent.Text.endindex + 2),
            `Missing a '${type}' for the '${command}' command`,
            vscode.DiagnosticSeverity.Error
        ));
    }

    export function UnknownWords(AcceptValues : string, lineIndex : number, item : SyntaxItem, collector: vscode.Diagnostic[]) : void {
        collector.push(new vscode.Diagnostic(
            new vscode.Range(lineIndex, item.Text.startindex, lineIndex, item.Text.endindex),
            `Unknown value: '${item.Text.text}', accepted values are: '${AcceptValues}'`,
            vscode.DiagnosticSeverity.Error
        ));
    }

}

export module Functions {

    export function provideDiagnosticsXYZ(path : string, item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : [SyntaxItem, boolean] {
        var item_x = item.Child;

        //x
		if (item_x == undefined) {
			Errors.Missing('coordinate', path + ' x', lineIndex, item, collector);
			return [item, false];
        }

        if (item_x.Text.text == "~~~") {
            return [item_x, true];
        }

        dm.CoordinateDiagnoser?.provideDiagnostic(item_x, lineIndex, collector, dm, document);

		var item_y = item_x.Child;

		//y
		if (item_y == undefined) {
			Errors.Missing('coordinate', path + ' x y', lineIndex, item_x, collector);
			return [item_x, false];
        }
        dm.CoordinateDiagnoser?.provideDiagnostic(item_x, lineIndex, collector, dm, document);

		var item_z = item_y.Child;

		//z
		if (item_z == undefined) {
			Errors.Missing('coordinate', path + ' x y z', lineIndex, item_y, collector);
			return [item_y, false];
        }
        dm.CoordinateDiagnoser?.provideDiagnostic(item_x, lineIndex, collector, dm, document);

        return [item_z, true];
    }
}

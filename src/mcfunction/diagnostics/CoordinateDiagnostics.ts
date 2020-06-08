import * as vscode from "vscode";
import { Selector, SelectorParameter } from "../selectors/selector";
import * as SF from "../selectors/functions";
import { DiagnosticsManager, DiagnosticProvider } from "../diagnostics/DiagnosticsManager";
import { SyntaxItem, RangedWord } from "../../general/include";

export class CoordinateDiagnosticProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void{
        if (item == undefined)
            return;

        var word = item.Text;
        var text = word.text;

        if (text == "~" || text == "^")
            return;

        if (text.match("(^[\-+0-9.]+$|^[\^\~][\-+0-9.]*$)")?.length == 0){
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, word.startindex, lineIndex, word.endindex),
                "Invalid coordinate",
                vscode.DiagnosticSeverity.Error
            ));
        }
    }
}

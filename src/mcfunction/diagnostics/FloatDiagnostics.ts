import * as vscode from "vscode";
import { DiagnosticsManager, DiagnosticProvider } from "./DiagnosticsManager";
import { SyntaxItem, RangedWord } from "../../general/include";

export class FloatDiagnosticProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void{
        if (item == undefined)
            return;

        var word = item.Text;
        var text = word.text;

        if (text == "~" || text == "^")
            return;

        if (text.match("^[\-+0-9.]+$")?.length == 0){
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, word.startindex, lineIndex, word.endindex),
                "Invalid coordinate",
                vscode.DiagnosticSeverity.Error
            ));
        }
    }
}

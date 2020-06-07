import * as vscode from "vscode";
import { DiagnosticsManager, DiagnosticProvider } from "../diagnostics/DiagnosticsManager";
import { SyntaxItem } from "../../general/include";

export class BooleanDiagnosticProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void {
        if (item.Text.text == "true" || item.Text.text == "true")
            return;

        collector.push(
            new vscode.Diagnostic(
                new vscode.Range(lineIndex, item.Text.startindex, lineIndex, item.Text.endindex),
                "Is not a valid boolean value, must be either 'true' or 'false'",
                vscode.DiagnosticSeverity.Error));
    }
}
import * as vscode from 'vscode';
import * as fs from "fs";
import { DiagnosticsManager, DiagnosticProvider } from "../diagnostics/DiagnosticsManager";
import { SyntaxItem } from "../../general/include";

export function activate(context: DiagnosticsManager) {
    context.set(new ScoreboardDiagnosticProvider(), ["scoreboard"]);
}

class ScoreboardDiagnosticProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
        var Child = item.Child;

        if (Child == undefined) {
            return;
        }

        switch (Child.Text.text) {
            case "players":
                this.playerDiagnostic(Child, lineIndex, collector, dm, document);
                return;
            case "objectives":
                this.objectiveDiagnostic(Child, lineIndex, collector, dm, document);
                return;
            default:
                collector.push(new vscode.Diagnostic(
                    new vscode.Range(lineIndex, Child.Text.startindex, lineIndex, Child.Text.endindex),
                    "unknown scoreboard command",
                    vscode.DiagnosticSeverity.Error
                ));
                return;
        }
    }

    playerDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

    }

    objectiveDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
        var Child = item.Child;

        if (Child == undefined) {
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, item.Text.startindex, lineIndex, item.Text.endindex),
                "scoreboard objectives needs a follow up",
                vscode.DiagnosticSeverity.Error
            ));
            return;
        }

        switch (Child.Text.text) {
            case "list":
                return;

            case "remove":
            case "add":
                this.objectiveNameDiagnostic(Child, lineIndex, collector);
                return;

            case "setdisplay":
                this.setDisplayDiagnostic(Child, lineIndex, collector);
                return;

            default:
                collector.push(new vscode.Diagnostic(
                    new vscode.Range(lineIndex, Child.Text.startindex, lineIndex, Child.Text.endindex),
                    "unknown scoreboard objectives command",
                    vscode.DiagnosticSeverity.Error
                ));
                return;
        }
    }

    objectiveNameDiagnostic(parent: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[]): void {
        var Child = parent.Child;

        if (Child == undefined) {
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, parent.Text.endindex + 1, lineIndex, parent.Text.endindex + 2),
                "expected a scoreboard name",
                vscode.DiagnosticSeverity.Error
            ));
            return;
        }

        if (!Child.Text.text.match("^[a-zA-Z_0-9][a-zA-Z\-_0-9\.+]$")) {
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, Child.Text.endindex + 1, lineIndex, Child.Text.endindex + 2),
                "invalid scoreboard name",
                vscode.DiagnosticSeverity.Error
            ));
            return;
        }
    }

    setDisplayDiagnostic(parent: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[]): void {
        var Child = parent.Child;

        if (Child == undefined) {
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, parent.Text.startindex, lineIndex, parent.Text.endindex),
                "scoreboard objectives setdisplay needs a follow up"
            ));
            return;
        }

        switch (Child.Text.text) {
            case "belowname":
            case "list":
            case "sidebar":
                if (Child.Child == undefined)
                    return;
                    
                this.objectiveNameDiagnostic(Child, lineIndex, collector);
                return;

            default:
                collector.push(new vscode.Diagnostic(
                    new vscode.Range(lineIndex, Child.Text.endindex + 1, lineIndex, Child.Text.endindex + 2),
                    "invalid scoreboard objectives setdisplay name",
                    vscode.DiagnosticSeverity.Error
                ));
                return;
        }
    }
}
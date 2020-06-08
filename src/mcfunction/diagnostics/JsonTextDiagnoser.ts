import * as vscode from "vscode";
import { DiagnosticsManager, DiagnosticProvider } from "./DiagnosticsManager";
import { SyntaxItem, RangedWord } from "../../general/include";
import { stringify } from "querystring";

export class JsonTextDiagnoserProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
        if (item == undefined)
            return;

        var text = item.Text.text;

        if (!text.startsWith("{") || !text.endsWith("}")) {
            collector.push(new vscode.Diagnostic(
                item.Text.ToRange(lineIndex),
                "Json text does not properly close or start with an '{' or '}'",
                vscode.DiagnosticSeverity.Error
            ));
            return;
        }

        try {
            var Object = JSON.parse(item.Text.text);

            for (var property in Object) {
                switch (property) {
                    case 'rawtext':
                        var rawTextProperty = Object[property];
                        this.exploreRawText(rawTextProperty, item, lineIndex, collector, dm, document);

                        break;
                    default:
                        collector.push(new vscode.Diagnostic(
                            item.Text.ToRange(lineIndex),
                            "Found unknown property: " + property,
                            vscode.DiagnosticSeverity.Error
                        ));
                }
            }
        }
        catch (Error) {
            collector.push(new vscode.Diagnostic(
                item.Text.ToRange(lineIndex),
                "Json text is not valid" + Error.message,
                vscode.DiagnosticSeverity.Error
            ));
        }
    }

    exploreRawText(rawTextProperty: any, json: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) {
        for (var item in rawTextProperty) {
            var itemObject = rawTextProperty[item];
            var pstring = itemObject instanceof String;

            if (pstring) {

            }
            else {
                for (var property in itemObject) {
                    switch (property) {
                        case 'text':
                            var p = itemObject[property];
                            if (typeof p != 'string') {
                                collector.push(new vscode.Diagnostic(
                                    json.Text.ToRange(lineIndex),
                                    "property: 'text's value must be a string",
                                    vscode.DiagnosticSeverity.Error
                                ));
                            }

                            break;
                        case 'translate':
                            var p = itemObject[property];
                            if (typeof p != 'string') {
                                collector.push(new vscode.Diagnostic(
                                    json.Text.ToRange(lineIndex),
                                    "property: 'text's value must be a string",
                                    vscode.DiagnosticSeverity.Error
                                ));
                            }

                            break;
                        default:
                            collector.push(new vscode.Diagnostic(
                                json.Text.ToRange(lineIndex),
                                "Found unknown property: " + property,
                                vscode.DiagnosticSeverity.Error
                            ));

                            break;
                    }
                }
            }
        }
    }
}

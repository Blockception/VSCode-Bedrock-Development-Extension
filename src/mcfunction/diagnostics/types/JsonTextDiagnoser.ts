/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import * as vscode from "vscode";
import { DiagnosticsManager, DiagnosticProvider } from "../DiagnosticsManager";
import { SyntaxItem } from "../../../general/include";

export class JsonTextDiagnoserProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
        if (item == undefined)
            return;

        let text = item.Text.text;

        if (!text.startsWith("{") || !text.endsWith("}")) {
            collector.push(new vscode.Diagnostic(
                item.Text.ToRange(lineIndex),
                "Json text does not properly close or start with an '{' or '}'",
                vscode.DiagnosticSeverity.Error
            ));
            return;
        }

        try {
            let Object = JSON.parse(item.Text.text);

            for (let property in Object) {
                switch (property) {
                    case 'rawtext':
                        let rawTextProperty = Object[property];
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
        for (let item in rawTextProperty) {
            let itemObject = rawTextProperty[item];
            let pstring = itemObject instanceof String;

            if (pstring) {
                //
            }
            else {
                for (let property in itemObject) {
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

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

import * as vscode from 'vscode';

export const collection = vscode.languages.createDiagnosticCollection("language-diagnostics");

export function activate(context: vscode.ExtensionContext) {
    console.log("activating language diagnostics");
    
    //If window is open, create new diagnostics
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }

    //Register events
	context.subscriptions.push(
        //update
        vscode.workspace.onDidChangeTextDocument(e =>{
            updateDiagnostics(e.document, collection)
        }),
        //when window is changed
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                updateDiagnostics(editor.document, collection);
            }
        })
    );
}

//Updates the content of the collection of diagnostis for the specified document
function updateDiagnostics(document : vscode.TextDocument, collection : vscode.DiagnosticCollection){
    if (!document.uri.fsPath.endsWith(".lang"))
        return;

    console.log("running diagnostics start:\t" + document.fileName);

    var docCollection = new Array<vscode.Diagnostic>();
    var Keys = new Map<string, vscode.Range>();

    for (var lineIndex = 0; lineIndex < document.lineCount; lineIndex++){
        var line = document.lineAt(lineIndex);
        var text = line.text;

        if (text === "" || text.startsWith("##"))
            continue;

        var index = text.indexOf("=");

        if (index < 0){
            docCollection.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, 0, lineIndex, line.text.length),
                "Not a propery language text, either comment the line or add a key",
                vscode.DiagnosticSeverity.Error
            ));
        }
        else {
            var key = text.substring(0, index);

            if (Keys.has(key)){
                var Item = Keys.get(key);

                if (Item != undefined) {
                    docCollection.push(new vscode.Diagnostic(
                            Item,
                            "has a duplicate at line: " + (lineIndex + 1),
                            vscode.DiagnosticSeverity.Error),

                        new vscode.Diagnostic(
                            new vscode.Range(lineIndex, 0, lineIndex, index),
                            "has a duplicate at line: " + (Item.start.line + 1),
                            vscode.DiagnosticSeverity.Error
                    ));
                }
            }
            else{
                let Range = new vscode.Range(lineIndex, 0, lineIndex, index);

                if (index + 1 >= text.length){
                    docCollection.push(new vscode.Diagnostic(
                        Range,
                        "Value cannot be empty, must contain something",
                        vscode.DiagnosticSeverity.Error
                    ));
                }

                Keys.set(key, Range);
            }
        }
    }

    collection.set(document.uri, docCollection);
    console.log("running diagnostics done:\t" + document.fileName);
}
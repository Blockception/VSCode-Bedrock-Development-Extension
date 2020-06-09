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
import * as constants from "../constants";
import * as Functions from "../general/include"

export function activate(context: vscode.ExtensionContext): void {
    console.log("activating formatter");
    //register command
    vscode.commands.registerCommand("blockception.mcfunction.formatter", () => {
        const { activeTextEditor } = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === constants.McFunctionIdentifier) {
            return McfunctionFormatter.format(activeTextEditor.document);
        }
    });

    var Formatter = new McfunctionFormatter();

    context.subscriptions.push(
        //formatter for whole document
        vscode.languages.registerDocumentFormattingEditProvider(constants.McFunctionIdentifier, Formatter),

        //formatter for ranged document
        vscode.languages.registerDocumentRangeFormattingEditProvider(constants.McFunctionIdentifier, Formatter)
    );
}

//Mcfunction formatter
class McfunctionFormatter implements vscode.DocumentFormattingEditProvider, vscode.DocumentRangeFormattingEditProvider {
    provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token : vscode.CancellationToken) : vscode.ProviderResult<vscode.TextEdit[]> {
        var collection = new Array<vscode.TextEdit>();

        for (let index = range.start.line; index < range.end.line; index++) {
            McfunctionFormatter.formatline(index, document, collection);        
        } 

        return collection;
    }

    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
        return McfunctionFormatter.format(document);
    }

    //formatts the whole document
    static format(document: vscode.TextDocument): vscode.TextEdit[] {
        var collection = new Array<vscode.TextEdit>();

        for (let index = 0; index < document.lineCount; index++) {
            var Line = document.lineAt(index);
            var Text = Line.text;
        
            if (Text.length > 2){
                Functions.TextEdits.TrimStartFromLine(Line, collection, ["", "/", " ", "\t"])
                Functions.TextEdits.TrimEndFromLine(Line, collection, ["", " ", "\t"])
        
                Functions.TextEdits.ReplaceTextFromLine("~+", "~", Line, collection);
                Functions.TextEdits.ReplaceTextFromLine("~0", "~", Line, collection);
                Functions.TextEdits.ReplaceTextFromLine("^+", "^", Line, collection);
                Functions.TextEdits.ReplaceTextFromLine("^0", "^", Line, collection);
            }    
        } 

        return collection;
    }

    //formatts the specified line
    static formatline(index : number, document: vscode.TextDocument, collection: vscode.TextEdit[]) {
        var Line = document.lineAt(index);
        var Text = Line.text

        if (Text.length > 2){
            Functions.TextEdits.TrimStartFromLine(Line, collection, ["", "/", " ", "\t"])
            Functions.TextEdits.TrimEndFromLine(Line, collection, ["", " ", "\t"])

            Functions.TextEdits.ReplaceTextFromLine("~+", "~", Line, collection);
            Functions.TextEdits.ReplaceTextFromLine("~0", "~", Line, collection);
            Functions.TextEdits.ReplaceTextFromLine("^+", "^", Line, collection);
            Functions.TextEdits.ReplaceTextFromLine("^0", "^", Line, collection);
        }
    }
}
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
import * as constants from "../../constants";
import * as functions from "../../general/include";
import { collection } from '../diagnostics/Diagnostics';
import { SyntaxTree, SyntaxItem } from '../../general/include';

//Activate the mcfunction part of the extension
export function activate(context: vscode.ExtensionContext) {
    console.log("activating mcfunction symbols providers");

    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(constants.McFunctionIdentifier, new McfunctionSymbolProvider())
    );
}

class McfunctionSymbolProvider implements vscode.DocumentSymbolProvider {
    provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[] | vscode.DocumentSymbol[]> { 
        var Out = new Array<vscode.SymbolInformation>();

        var container = Function(document, Out);

        this.checkLines(document, Out, container);

        return Out;
    }

    checkLines(document: vscode.TextDocument, Collector : vscode.SymbolInformation[], container : string) : void {
        for (var lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
            var Tree = SyntaxTree.ParseEntireTree(document.lineAt(lineIndex));
            var Root = Tree.Root;

            if (Root != undefined) {
                this.checkTree(Root, lineIndex, document, Collector, container);
            }
        }
    }

    checkTree(Item : SyntaxItem, lineIndex : number, document: vscode.TextDocument, Collector : vscode.SymbolInformation[], container : string) : void {
        Collector.push(new vscode.SymbolInformation(
            Item.Text.text,
            vscode.SymbolKind.Method,
            container,
            new vscode.Location(document.uri, new vscode.Range(lineIndex, Item.Text.startindex, lineIndex, Item.Text.endindex))));

        var Child = Item.Child;

        if (Child == undefined)
            return;

        switch(Item.Text.text){
            case "function":
                Collector.push(new vscode.SymbolInformation(
                    Child.Text.text,
                    vscode.SymbolKind.Class,
                    container,
                    new vscode.Location(document.uri, new vscode.Range(lineIndex, Child.Text.startindex, lineIndex, Child.Text.endindex))));


                return;
            
            case "execute":


                return;

            default:
                return;
        }
    }
}


function Function(document: vscode.TextDocument, Collector : vscode.SymbolInformation[]) : string {
    var filepath = document.fileName;
    var index = filepath.indexOf("\\functions\\");

    var name = functions.GetFilename(filepath);

    Collector.push(
        new vscode.SymbolInformation(
            name,
            vscode.SymbolKind.Class,
            "functions",
            new vscode.Location(
                document.uri, 
                new vscode.Range(0, 0, document.lineCount, document.lineAt(document.lineCount - 1).text.length))));

    return name;
}
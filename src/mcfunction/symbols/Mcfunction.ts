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
import * as functions from "../../general/include";
import { SyntaxTree, SyntaxItem } from '../../general/include';

export class McfunctionSymbolProvider implements vscode.DocumentSymbolProvider {
    //Handle request
    async provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SymbolInformation[] | vscode.DocumentSymbol[]> {
        return new Promise<vscode.SymbolInformation[] | vscode.DocumentSymbol[]>((resolve, reject) => {
            resolve(this.internalProvideDocumentSymbols(document));
        });
    }

    //Provide symbols
    private internalProvideDocumentSymbols(document: vscode.TextDocument) : vscode.SymbolInformation[] {
        let Out : vscode.SymbolInformation[] = [];

        Function(document, Out);

        this.checkLines(document, Out);

        return Out;
    }

    private checkLines(document: vscode.TextDocument, Collector: vscode.SymbolInformation[]): void {
        for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
            let Tree = SyntaxTree.ParseEntireTree(document.lineAt(lineIndex));
            let Root = Tree.Root;

            if (Root != undefined) {
                this.checkTree(Root, lineIndex, document, Collector);
            }
        }
    }

    private checkTree(Item: SyntaxItem, lineIndex: number, document: vscode.TextDocument, Collector: vscode.SymbolInformation[]): void {
        Collector.push(new vscode.SymbolInformation(
            Item.Text.text,
            vscode.SymbolKind.Method,
            'mcfunction',
            new vscode.Location(document.uri, new vscode.Range(lineIndex, Item.Text.startindex, lineIndex, Item.Text.endindex))));

        let Child = Item.Child;

        if (Child == undefined)
            return;

        switch (Item.Text.text) {
            case "function":
                Collector.push(new vscode.SymbolInformation(
                    Child.Text.text,
                    vscode.SymbolKind.Class,
                    'mcfunction',
                    new vscode.Location(document.uri, new vscode.Range(lineIndex, Child.Text.startindex, lineIndex, Child.Text.endindex))));

                return;

            case "execute":


                return;

            default:
                return;
        }
    }
}

function Function(document: vscode.TextDocument, Collector: vscode.SymbolInformation[]): void {
    let filepath = document.fileName;
    let name = functions.GetFilename(filepath);

    Collector.push(
        new vscode.SymbolInformation(
            name,
            vscode.SymbolKind.Class,
            'mcfunction',
            new vscode.Location(
                document.uri,
                new vscode.Range(0, 0, document.lineCount, document.lineAt(document.lineCount - 1).text.length))));
}
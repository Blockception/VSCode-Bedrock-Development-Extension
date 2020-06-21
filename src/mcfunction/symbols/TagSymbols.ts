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
import { mcfunctionDatabase } from '../Database';
import { CancellationToken } from 'vscode';
import { RemoveComment } from '../functions/include';

export class RegionSymbolProvider implements vscode.DocumentSymbolProvider, vscode.WorkspaceSymbolProvider {
    //Provides document symbols
    provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[] | vscode.DocumentSymbol[]> { 
        var Out = new Array<vscode.SymbolInformation>();

        for (var I = 0; I < document.lineCount; I++){
            var Line = document.lineAt(I);
            var Text = Line.text;

            var match = Text.match('tag .* add');

            if (match == undefined)
                continue;

            match.forEach(m => {
                var start = m.indexOf(' add');

                if (start > 0){
                    var Tag = RemoveComment(m.substring(start, m.length)).trim();

                    var TagSymbol = new vscode.SymbolInformation('Tag', vscode.SymbolKind.Constant, '', new vscode.Location(
                        document.uri, new vscode.Position(I, m.indexOf(Tag))
                    ));
                    Out.push(TagSymbol);
                }
            });
        }

        var Collection = mcfunctionDatabase.Symbols.Tags.Get(document.uri);
        Collection.Values = Out;

        return Out;
    }

    //
    provideWorkspaceSymbols(query: string, token: CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[]> {
        if (query.trim() == ''){
            var First = mcfunctionDatabase.Symbols.Regions.First();
            return First.Values;
        }

        var Out = new Array<vscode.SymbolInformation>();


        return Out;
    }
}
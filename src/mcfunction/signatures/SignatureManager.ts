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
import { SyntaxItem, SyntaxTree } from '../../general/include';
import { SignatureHelp } from 'vscode';

export interface SignatureItemProvider {
    //
    provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp>;
}

export class SignatureManager implements vscode.SignatureHelpProvider {

    public SignatureProviders: Map<string, SignatureItemProvider>;

    constructor() {
        this.SignatureProviders = new Map<string, SignatureItemProvider>();
    }

    set(Cm : SignatureItemProvider, keywords : string[]) : void {
        keywords.forEach(word => this.SignatureProviders.set(word, Cm));
    }

    provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.SignatureHelpContext): vscode.ProviderResult<vscode.SignatureHelp> {
        var Line = document.lineAt(position.line);

        if (position.character < 3) {
            return undefined;
        }

        var Tree = SyntaxTree.ParseTree(Line, position);

        var Item = Tree.Root;
        if (Item == undefined)
            return undefined;

        var Diagnoser = this.SignatureProviders.get(Item.Text.text);

        if (Diagnoser != undefined) {
            var Items = Diagnoser.provideSignature(Item, this);
            return Items;
        }

        return undefined;
    }
}
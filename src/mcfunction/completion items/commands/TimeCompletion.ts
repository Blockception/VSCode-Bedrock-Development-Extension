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
import { CompletionItemProvider, CompletionItemManager } from "../CompletionItemManager";
import { SyntaxItem, createCompletionItem } from "../../../general/include";

export class TimeCompletionProvider implements CompletionItemProvider {

    public Modes : vscode.CompletionItem[];
    public TimeSpec : vscode.CompletionItem[];
    public Queries : vscode.CompletionItem[];

    constructor(){
        this.Modes = [
            createCompletionItem("add", "add", "Adds more time to the world's game time.", vscode.CompletionItemKind.Function),
            createCompletionItem("set", "set", "Sets to the world's game time.", vscode.CompletionItemKind.Function),
            createCompletionItem("query", "query", "Queries the world's game time.", vscode.CompletionItemKind.Function)
        ];
        this.Queries = [
            createCompletionItem('daytime', 'daytime', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('gametime', 'gametime', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('day', 'day', '', vscode.CompletionItemKind.Keyword)
        ];
        this.TimeSpec = [
            createCompletionItem('day', 'daytime', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('midnight', 'midnight', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('night', 'night', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('noon', 'noon', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('sunrise', 'sunrise', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('sunset', 'sunset', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('0', 'Integer', 'An integer between 0 and 24000 is also accepted', vscode.CompletionItemKind.Keyword)
        ]
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.CompletionItem[] | undefined {

        //time add <amount: int>
        //time set <time: TimeSpec|amount: int>
        //time query <daytime|gametime|day>

        var Child = Item.Child;

        if (Child == undefined){
            return this.Modes;
        }

        switch(Child.Text.text){
            case 'add':
                return Cm.IntegerCompletionProvider.provideCompletionItems(); 

            case 'set':
                return this.TimeSpec;

            case 'query':
                return this.Queries;
        }


        return undefined;
    }
}
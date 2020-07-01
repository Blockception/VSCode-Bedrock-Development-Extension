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

export class TitleCompletionProvider implements CompletionItemProvider {

    public Modes : vscode.CompletionItem[];

    constructor() {
        this.Modes = [
            createCompletionItem('clear', 'clear', 'Clears the titles of the specified player', vscode.CompletionItemKind.Function),
            createCompletionItem('reset', 'reset', 'Resets the titles of the specified player', vscode.CompletionItemKind.Function),
            createCompletionItem('title', 'title', 'Sets the title part of the specified player', vscode.CompletionItemKind.Function),
            createCompletionItem('subtitle', 'subtitle', 'Sets the subtitle part of the specified player', vscode.CompletionItemKind.Function),
            createCompletionItem('actionbar', 'actionbar', 'Sets the actionbar part of the specified player', vscode.CompletionItemKind.Function),
            createCompletionItem('times', 'times', 'Sets the times of the specified player', vscode.CompletionItemKind.Function),
        ];
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //title <player: target> clear
        //title <player: target> reset
        //title <player: target> <title|subtitle|actionbar> <Message>
        //title <player: target> times <fadeIn: int> <stay: int> <fadeOut: int>

        var ModeChild = Item.GetAt(2);
        var Mode = 'clear';

        if (ModeChild != undefined){
            Mode = ModeChild.Text.text;
        }

        switch (Item.Count()) {
            case 0: //<player: target>
                return Cm.SelectorCompletion.provideCompletionItems();

            case 1: //<modes>
                return this.Modes;

            case 2: //<Message> | <fadein: int>
                if (Mode == 'title' || Mode == 'subtitle' || Mode == 'actionbar')
                    return undefined;

                if (Mode == 'times')
                    return Cm.IntegerCompletionProvider.provideCompletionItems();

                break;
            case 3: //<stay: int>
            case 4: //<fadeOut: int>
                if (Mode == 'times')
                    return Cm.IntegerCompletionProvider.provideCompletionItems();

            default:
                break;
        }

        return undefined;
    }
}
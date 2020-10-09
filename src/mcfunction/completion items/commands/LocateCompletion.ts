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
import { CompletionItemProvider, CompletionItemManager, CompletionData } from "../CompletionItemManager";
import { SyntaxItem, createCompletionItem } from "../../../general/include";

export class LocateCompletionProvider implements CompletionItemProvider {

    public Objects : vscode.CompletionItem[];

    constructor(){
        this.Objects = new Array<vscode.CompletionItem>(
            createCompletionItem("buriedtreasure", "buriedtreasure", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("endcity", "endcity", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("fortress", "fortress", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("mansion", "mansion", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("mineshaft", "mineshaft", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("monument", "monument", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("ruins", "ruins", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("shipwreck", "shipwreck", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("stronghold", "stronghold", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("temple", "temple", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("village", "village", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword),
            createCompletionItem("pillageroutpost", "pillageroutpost", "Display the coordinates for the closest structure of a given type.", vscode.CompletionItemKind.Keyword)
        );
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): CompletionData {

        //gamerule [rule] [value]

        switch (Item.Count()) {
            case 0: //[Thing]
                return this.Objects;

            default:
                break;
        }

        return undefined;
    }
}
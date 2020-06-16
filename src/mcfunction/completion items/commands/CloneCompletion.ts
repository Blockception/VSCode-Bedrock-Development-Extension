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
import * as fs from "fs";
import { CompletionItemProvider, CompletionItemManager } from "../CompletionItemManager";
import { SyntaxItem, createCompletionItem } from "../../../general/include";

export class CloneCompletionProvider implements CompletionItemProvider {

    public Modes : vscode.CompletionList;
    public SecondModes : vscode.CompletionList;



    constructor(){
        this.Modes = new vscode.CompletionList();
        this.SecondModes = new vscode.CompletionList();
        this.Modes.items.push(
            createCompletionItem("filtered", "filtered", "filter blocks"),
            createCompletionItem("replace", "replace", ""),
            createCompletionItem("masked", "masked", "")
        );
        this.SecondModes.items.push(
            createCompletionItem("filtered", "filtered", "filter blocks"),
            createCompletionItem("replace", "replace", ""),
            createCompletionItem("masked", "masked", "")
        );
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument) : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //clone <begin: x y z> <end: x y z> <destination: x y z> [replace|masked] [normal|force|move]
        //clone <begin: x y z> <end: x y z> <destination: x y z> filtered <normal|force|move> <tileName: Block> <tileData: int>

        switch (Item.Count()) {
            case 1: //Clone
            case 2: //Clone <x>
            case 3: //Clone <x> <y>
            case 4: //Clone <x> <y> <z>
            case 5: //Clone <x> <y> <z> <x>
            case 6: //Clone <x> <y> <z> <x> <y>
                return Cm.CoordinateCompletionProvider.provideDiagnostics();                

            case 7: //Clone <x> <y> <z> <x> <y> <z>
                return this.Modes;

            case 8: //Clone <x> <y> <z> <x> <y> <z> <Mode>
                var Mode = Item.GetAt(8);

                if (Mode == undefined){
                    return this.Modes;
                }

                if (Mode.Text.text == "filtered"){
                    return this.provideCompletionFiltered(Item, Cm, document);
                }
                else {
                    return this.SecondModes;
                }
            default:
                break;
        }

        return undefined;
    }

    provideCompletionFiltered(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument) : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        switch(Item.Count()){
            default:
            case 1:
                return Cm.BlockCompletionProvider?.provideCompletionItems(Item, Cm, document);

            case 2:
                return Cm.Default.BlockData;
        }
    }
}
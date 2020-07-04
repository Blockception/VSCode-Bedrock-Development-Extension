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

export class FillCompletionProvider implements CompletionItemProvider {

    constructor(){
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument) : vscode.CompletionItem[] | undefined {
        //fill <from: x y z> <to: x y z> <tileName: Block> [tileData: int] [outline|hollow|destroy|keep]
        //fill <from: x y z> <to: x y z> <tileName: Block> <tileData: int> replace [replaceTileName: Block] [replaceDataValue: int]
        var Child = Item.GetAt(9);
        var Count = Item.Count();

        var IfReplace = false;

        if (Child != undefined){
            IfReplace = Child.Text.text == "replace";
        }

        switch (Count) {
            case 0: //<from: x>
            case 1: //<from: y>
            case 2: //<from: z>
            case 3: //<to: x>
            case 4: //<to: y>
            case 5: //<to: z>
                return Cm.CoordinateCompletionProvider.provideDiagnostics();

            case 6: //<tileName: Block>
                return Cm.BlockCompletionProvider.provideCompletionItems();

            case 7: //<tileData: int>
                return Cm.Default.BlockData;
        }

        return undefined;
    }
}
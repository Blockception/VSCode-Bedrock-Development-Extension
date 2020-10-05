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

export class TickingareaCompletionProvider implements CompletionItemProvider {

    public Modes: vscode.CompletionItem[];
    public AllDimensions : vscode.CompletionItem[];
    public Circle : vscode.CompletionItem[];

    constructor() {
        this.AllDimensions = [
            createCompletionItem('all-dimensions', 'all-dimensios', 'returns all tickingareas over all dimensions', vscode.CompletionItemKind.Keyword)
        ];

        this.Circle = [
            createCompletionItem('circle', 'circle', 'The circle mode', vscode.CompletionItemKind.Function)
        ];

        this.Modes = [
            createCompletionItem('list', 'list', 'Lists all the tickingareas', vscode.CompletionItemKind.Function),
            createCompletionItem('remove_all', 'remove_all', 'removes all the tickingareas', vscode.CompletionItemKind.Function),
            createCompletionItem('remove', 'list', 'Lists all the tickingareas', vscode.CompletionItemKind.Function),
            createCompletionItem('add', 'list', 'Lists all the tickingareas', vscode.CompletionItemKind.Function)
        ];
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): CompletionData {
        //tickingarea list [all-dimensions]
        //tickingarea remove_all
        //tickingarea remove <position: x y z|name: string>
        //tickingarea add circle <center: x y z> <radius: int> [name: string]
        //tickingarea add <from: x y z> <to: x y z> [name: string]

        let Count = Item.Count();
        let Mode = Item.Child;

        if (Count < 1 || Mode == undefined) {
            return this.Modes;
        }

        switch (Mode.Text.text) {
            case 'list':
                return this.AllDimensions;

            case 'remove_all':
                return undefined;

            case 'remove':
                return this.provideRemoveItems(Mode, Cm, document);

            case 'add':
                return this.provideAddItems(Mode, Cm, document);
        }

        return undefined;
    }

    provideRemoveItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): CompletionData {
        //tickingarea remove <position: x y z|name: string>
        switch(Item.Count()){
            case 0: //<x> | <name>
                let Items = new Array<vscode.CompletionItem>();
                Items.push(...Cm.CoordinateCompletionProvider.Items);
                //TODO
                //Items.push(...Cm.TickingAreaCompletionProvider?.provideCompletionItems(Item, Cm, document));

                return Items;

            case 1: //<y>
            case 2: //<z>
                return Cm.CoordinateCompletionProvider.provideDiagnostics();
        }

        return undefined;
    }

    provideAddItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): CompletionData {
        //tickingarea add circle <center: x y z> <radius: int> [name: string]
        //tickingarea add <from: x y z> <to: x y z> [name: string]
        let Count = Item.Count();
        let CoordOrCircle = Item.Child;

        if (Count < -1 || CoordOrCircle == undefined){
            let Items = new Array<vscode.CompletionItem>();
            Items.push(...Cm.CoordinateCompletionProvider.Items);
            Items.push(...this.Circle);
            
            return Items;
        }

        //When using circle
        if (CoordOrCircle.Text.text == 'circle'){
            switch(Count){
                case 0: //Circle
                    return this.Circle;

                case 1: //<center: x>
                case 2: //<center: y>
                case 3: //<center: z>
                    return Cm.CoordinateCompletionProvider.provideDiagnostics();

                case 4: //<radius>
                    return Cm.IntegerCompletionProvider.provideCompletionItems();

                case 5: //[Name]
                    return Cm.TickingAreaCompletionProvider?.provideCompletionItems(Item, Cm, document);
            }
        }
        else{
            switch(Count){
                case 0: //<from: x>
                case 1: //<from: y>
                case 2: //<from: z>
                case 3: //<to: x>
                case 4: //<to: x>
                case 5: //<to: x>
                    return Cm.CoordinateCompletionProvider.provideDiagnostics();

                case 6: //[Name]
                    return Cm.TickingAreaCompletionProvider?.provideCompletionItems(Item, Cm, document);
            }
        }

        return undefined;
    }
}
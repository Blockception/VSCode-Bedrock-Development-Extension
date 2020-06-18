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

export class ReplaceItemCompletionProvider implements CompletionItemProvider {

    public Modes : vscode.CompletionItem[];
    public EntitySlots : vscode.CompletionItem[];
    public Container : vscode.CompletionItem[];

    constructor() {
        this.Modes = [
            createCompletionItem('block', 'block', 'Targets a block with an inventory', vscode.CompletionItemKind.Function),
            createCompletionItem('entity', 'entity', 'Targets a entity with an inventory', vscode.CompletionItemKind.Function)
        ];
        this.EntitySlots = [
            createCompletionItem('slot.armor', 'slot.armor', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.armor.chest', 'slot.armor.chest', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.armor.feet', 'slot.armor.feet', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.armor.head', 'slot.armor.head', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.armor.legs', 'slot.armor.legs', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.chest', 'slot.chest', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.enderchest', 'slot.enderchest', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.hotbar', 'slot.hotbar', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.inventory', 'slot.inventory', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.saddle', 'slot.saddle', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.weapon.mainhand', 'slot.weapon.mainhand', '', vscode.CompletionItemKind.Keyword),
            createCompletionItem('slot.weapon.offhand', 'slot.weapon.offhand', '', vscode.CompletionItemKind.Keyword),
        ]
        this.Container = [
            createCompletionItem('slot.container', 'slot.container', '', vscode.CompletionItemKind.Keyword),
        ]
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //replaceitem block <position: x y z> slot.container <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]
        //replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]

        var Mode = Item.Child;

        if (Mode == undefined)
            return this.Modes;

        if (Mode.Text.text == 'entity'){
            return this.EntityItems(Mode, Cm, document);
        }

        return this.BlockItems(Mode, Cm, document);
    }

    EntityItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
         //replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]

         switch(Item.Count()){
             case 0: //<target: target>
                return Cm.SelectorCompletion.provideCompletionItems();

             case 1: //<slotType: EntityEquipmentSlot>
                return this.EntitySlots;

             case 2: //<slotId: int>
                return Cm.IntegerCompletionProvider?.provideCompletionItems(Item, Cm, document);

             case 3: //<itemName: Item>
                return Cm.ItemCompletionProvider?.provideCompletionItems(Item, Cm, document);

             case 4: //[amount: int] 
             case 5: //[data: int] 
                return Cm.IntegerCompletionProvider?.provideCompletionItems(Item, Cm, document);

             case 6: //[components: json]
                return Cm.Default.JsonItemComponents;
         }

         return undefined;
    }

    BlockItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //replaceitem block <position: x y z> slot.container <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]

        switch(Item.Count()){
            case 0: //x
            case 1: //y
            case 2: //z
               return Cm.SelectorCompletion.provideCompletionItems();

            case 3: //<slotId: int>
               return Cm.IntegerCompletionProvider?.provideCompletionItems(Item, Cm, document);

            case 4: //<itemName: Item>
               return Cm.ItemCompletionProvider?.provideCompletionItems(Item, Cm, document);

            case 5: //[amount: int] 
            case 6: //[data: int] 
               return Cm.IntegerCompletionProvider?.provideCompletionItems(Item, Cm, document);

            case 7: //[components: json]
               return Cm.Default.JsonItemComponents;
        }

        return undefined;
    }
}
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
import { IsSelector } from "../../selectors/selector";

export class TeleportCompletionProvider implements CompletionItemProvider {

    public Modes : vscode.CompletionItem[];
    public Items : vscode.CompletionItem[];
    public SecondsItems : vscode.CompletionItem[];

    constructor() {
        this.Modes = [
            createCompletionItem('facing', 'facing', 'Forces the victim to look at a point or entity', vscode.CompletionItemKind.Function)
        ];

        this.Items = [
            createCompletionItem("^", "^", "Relative pointing coordinate", vscode.CompletionItemKind.Operator),
            createCompletionItem("~", "~", "Relative coordinate", vscode.CompletionItemKind.Operator),
            createCompletionItem("@a", "All players", "Returns a selector that selects all players", vscode.CompletionItemKind.User),
            createCompletionItem("@e", "All entities", "Returns a selector that selects all entities", vscode.CompletionItemKind.User),
            createCompletionItem("@s", "Executing entity", "Returns a selector that selects the current executing entity", vscode.CompletionItemKind.User),
            createCompletionItem("@r", "Random player/entity", "Returns a selector that a random player, if type is specified then entities are included, use c to target more entities", vscode.CompletionItemKind.User),
            createCompletionItem("@p", "Nearest player", "Returns a selector that selects the nearest player from the execution location", vscode.CompletionItemKind.User),
            createCompletionItem("\"<entity name>\"", "dummy player", "Returns a example for an named entity", vscode.CompletionItemKind.User)         
        ];

        this.SecondsItems = [
            createCompletionItem("^", "^", "Relative pointing coordinate", vscode.CompletionItemKind.Operator),
            createCompletionItem("~", "~", "Relative coordinate", vscode.CompletionItemKind.Operator),
            createCompletionItem("facing", "facing", "forces the victim to look at a target or location", vscode.CompletionItemKind.Function)      
        ];
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //teleport <target> <x y z|destination> [yRot: value] [xRot: value] [checkForBlocks: Boolean]
        //teleport <target> <x y z|target> facing <lookAtEntity: target|x y z> [checkForBlocks: Boolean]
        //teleport <x y z|destination> [yRot: value] [xRot: value] [checkForBlocks: Boolean]
        //teleport <x y z|target> facing <lookAtEntity: target|x y z> [checkForBlocks: Boolean]
        
        var XorTarget = Item.Child;

        if (XorTarget == undefined){
            return Cm.SelectorCompletion.provideCompletionItems();
        }

        if (IsSelector(XorTarget.Text.text)){
            return this.TargetBranch(XorTarget, Cm, document);
        }
        else{
            return this.TargetLocation(XorTarget, Cm, document);
        }
    }

    TargetBranch(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>{
        //teleport <target> <x y z|destination> [yRot: value] [xRot: value] [checkForBlocks: Boolean]
        //teleport <target> <x y z|target> facing <lookAtEntity: target|x y z> [checkForBlocks: Boolean]
        var XOrDestination = Item.Child;
 
        if (XOrDestination == undefined){
            return this.Items;
        }

        if (IsSelector(XOrDestination.Text.text)){
            return this.TargetDestinationDone(XOrDestination, Cm, document);
        }

        var Child = Item.GetAt(3);

        if (Child != undefined){
            return this.TargetDestinationDone(Child, Cm, document);
        }

        return Cm.CoordinateCompletionProvider.provideDiagnostics();
    }


    TargetLocation(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>{
        //teleport <x y z> [yRot: value] [xRot: value] [checkForBlocks: Boolean]
        //teleport <x y z> facing <lookAtEntity: target|x y z> [checkForBlocks: Boolean]

        var Child = Item.GetAt(2);

        if (Child != undefined){
            return this.TargetDestinationDone(Child, Cm, document);
        }

        return Cm.CoordinateCompletionProvider.provideDiagnostics();
    }

    TargetDestinationDone(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>{
        //[yRot: value] [xRot: value] [checkForBlocks: Boolean]
        //facing <lookAtEntity: target|x y z> [checkForBlocks: Boolean]

        var YRotOrFacing = Item.Child;

        if (YRotOrFacing == undefined){
            return this.SecondsItems;
        }

        if (YRotOrFacing.Text.text == 'facing'){
            return this.Facing(YRotOrFacing, Cm, document);
        }

        switch(YRotOrFacing.Count()){
            case 0: //XRot
                return Cm.CoordinateCompletionProvider.provideDiagnostics();

            case 1:
                return Cm.BooleanCompletionProvider.default;

        }

        return undefined;
    }

    Facing(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>{
        //facing <lookAtEntity: target|x y z> [checkForBlocks: Boolean]
        var XOrDestination = Item.Child;

        if (XOrDestination == undefined){
            return this.Items;
        }

        if (IsSelector(XOrDestination.Text.text)){
            return Cm.BooleanCompletionProvider.default;
        }

        switch(XOrDestination.Count()){
            case 0: //Y
            case 1: //Z
                return Cm.CoordinateCompletionProvider.provideDiagnostics();

            case 2: //Boolean:
                return Cm.BooleanCompletionProvider.default;
        }

        return undefined;
    }
}
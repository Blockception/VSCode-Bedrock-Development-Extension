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

export class ScoreboardCompletionProvider implements CompletionItemProvider {

    public Modes: vscode.CompletionItem[];
    public ModesObjectives: vscode.CompletionItem[];
    public SetDisplaySlots: vscode.CompletionItem[];
    public Dummy: vscode.CompletionItem[];
    public ModesPlayers: vscode.CompletionItem[];
    public Operations: vscode.CompletionItem[];
    public Range: vscode.CompletionItem[];

    constructor() {
        this.Modes = [
            createCompletionItem('objectives', 'objectives', 'Manipulate the scoreboard objectives', vscode.CompletionItemKind.Function),
            createCompletionItem('players', 'players', 'Manipulate the scores of entities', vscode.CompletionItemKind.Function),
        ];
        this.ModesObjectives = [
            createCompletionItem('list', 'list', '', vscode.CompletionItemKind.Function),
            createCompletionItem('add', 'add', '', vscode.CompletionItemKind.Function),
            createCompletionItem('remove', 'remove', '', vscode.CompletionItemKind.Function),
            createCompletionItem('setdisplay', 'setdisplay', '', vscode.CompletionItemKind.Function)
        ];
        this.SetDisplaySlots = [
            createCompletionItem('belowname', 'belowname', '', vscode.CompletionItemKind.Function),
            createCompletionItem('list', 'list', '', vscode.CompletionItemKind.Function),
            createCompletionItem('sidebar', 'sidebar', '', vscode.CompletionItemKind.Function),
        ];
        this.Dummy = [
            createCompletionItem('dummy', 'dummy', 'the only type minecraft bedrock allows', vscode.CompletionItemKind.TypeParameter)
        ];
        this.ModesPlayers = [
            createCompletionItem('list', 'list', '', vscode.CompletionItemKind.Function),
            createCompletionItem('add', 'add', '', vscode.CompletionItemKind.Function),
            createCompletionItem('remove', 'remove', '', vscode.CompletionItemKind.Function),
            createCompletionItem('reset', 'reset', '', vscode.CompletionItemKind.Function),
            createCompletionItem('operation', 'operation', '', vscode.CompletionItemKind.Function),
            createCompletionItem('test', 'test', '', vscode.CompletionItemKind.Function),
            createCompletionItem('random', 'random', '', vscode.CompletionItemKind.Function)
        ];
        this.Operations = [
            createCompletionItem('%=', '%= modulus', 'Calculates: target = target % source', vscode.CompletionItemKind.Operator),
            createCompletionItem('*=', '*= multiplication', 'Calculates: target = target * source(s)', vscode.CompletionItemKind.Operator),
            createCompletionItem('+=', '+= addition', 'Calculates: target = target + source(s)', vscode.CompletionItemKind.Operator),
            createCompletionItem('-=', '-= substractions', 'Calculates: target = target - source(s)', vscode.CompletionItemKind.Operator),
            createCompletionItem('/=', '/= modulus', 'Calculates: target = target / source', vscode.CompletionItemKind.Operator),
            createCompletionItem('<', '< minimum', 'Calculates: target = Min(target, source(s))', vscode.CompletionItemKind.Operator),
            createCompletionItem('>', '> maximum', 'Calculates: target = Max(target, source(s))', vscode.CompletionItemKind.Operator),
            createCompletionItem('=', '= assign', 'Moves the value from source to target', vscode.CompletionItemKind.Operator),
            createCompletionItem('><', '>< swap', 'Swaps the value from source and target', vscode.CompletionItemKind.Operator),
        ]
        this.Range = [
            createCompletionItem('0', '0', '', vscode.CompletionItemKind.Constant),
            createCompletionItem('1', '1', '', vscode.CompletionItemKind.Constant),
            createCompletionItem('*', '*', 'No limit', vscode.CompletionItemKind.Constant)
        ];
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var Mode = Item.Child;

        if (Mode == undefined) {
            return this.Modes;
        }

        switch (Mode.Text.text) {
            case 'objectives':
                return this.ObjectivesItems(Mode, Cm, document);

            case 'players':
                return this.PlayersItems(Mode, Cm, document);

            default:
                return this.Modes;
        }
    }

    ObjectivesItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var Mode = Item.Child;

        if (Mode == undefined)
            return this.ModesObjectives;

        switch (Mode.Text.text) {
            case 'list':
                //scoreboard objectives list
                break;

            case 'add':
                //scoreboard objectives add <name> dummy [display name: string] 
                switch (Item.Count()) {
                    case 0: //<Name>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);

                    case 1: //dummy
                        return this.Dummy;

                    case 2: //display name
                        return Cm.Default.String;
                }

            case 'remove':
                //scoreboard objectives remove <name>
                return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);

            case 'setdisplay':
                //scoreboard objectives setdisplay <slot> [objective]
                //scoreboard objectives setdisplay belowname [objective]
                //scoreboard objectives setdisplay list [objective]
                //scoreboard objectives setdisplay sidebar [objective]

                var SubMode = Mode.Child;

                if (SubMode == undefined) {
                    return this.SetDisplaySlots;
                }

                if (SubMode.Child == undefined) {
                    return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);
                }

                return Cm.BooleanCompletionProvider.default;
        }

        return this.ModesObjectives;
    }

    PlayersItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {


        var Mode = Item.Child;

        if (Mode == undefined) {
            return this.ModesPlayers;
        }

        switch (Mode.Text.text) {
            case 'list':
                //scoreboard players list [entity]
                if (Mode.Child == undefined)
                    return Cm.SelectorCompletion.provideCompletionItems();

                break;

            case 'set':
            case 'add':
            case 'remove':
                //scoreboard players set <entity: string> <objective> <score>
                //scoreboard players add <entity: string> <objective> <count>
                //scoreboard players remove <entity: string> <objective> <count>
                switch (Mode.Count()) {
                    case 0: //<entity: string>
                        return Cm.SelectorCompletion.provideCompletionItems();

                    case 1: //<objective>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);

                    case 2: //<score>
                        return Cm.IntegerCompletionProvider.provideCompletionItems();
                }
                break;

            case 'reset':
                //scoreboard players reset <entity: string> [objective]
                switch (Mode.Count()) {
                    case 0: //<entity: string>
                        return Cm.SelectorCompletion.provideCompletionItems();

                    case 1: //<objective>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);
                }
                break;

            case 'operation':
                //scoreboard players operation <targetName> <targetObjective> <Operation> <selector> <objective>
                switch (Mode.Count()) {
                    case 0: //<targetName>
                        return Cm.SelectorCompletion.provideCompletionItems();

                    case 1: //<targetObjective>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);

                    case 2:
                        return this.Operations;

                    case 3: //<selector>
                        return Cm.SelectorCompletion.provideCompletionItems();

                    case 4: //<objective>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);
                }
                break;

            case 'test':
                //scoreboard players test <entity> <objective> <min|*> <max|*>
                switch (Mode.Count()) {
                    case 0: //<entity>
                        return Cm.SelectorCompletion.provideCompletionItems();

                    case 1: //<objective>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);

                    case 2: //<min|*>
                    case 3: //<min|*>
                        return this.Range;
                }
                break;

            case 'random':
                //scoreboard players random <entity> <objective> <min> <max>
                switch (Mode.Count()) {
                    case 0: //<entity>
                        return Cm.SelectorCompletion.provideCompletionItems();

                    case 1: //<objective>
                        return Cm.ScoreCompletionProvider?.provideCompletionItems(Item, Cm, document);

                    case 2: //<min|*>
                    case 3: //<min|*>
                        return Cm.IntegerCompletionProvider.provideCompletionItems();
                }
                break;
            default:
        }

        return this.ModesPlayers;
    }
}
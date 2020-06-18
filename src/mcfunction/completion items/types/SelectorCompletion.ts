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
import * as SF from "../../selectors/functions"
import * as Functions from "../../../general/include";
import { mcfunctionDatabase } from "../../Database";

export class SelectorCompletionProvider {
    constructor() {
    }

    provideCompletionItems(): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        return InternalSelectorCompletionProvider.default;
    }
}

export class SelectorVscodeCompletionProvider implements vscode.CompletionItemProvider {
    constructor() {
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        if (!SF.IsInSelector(document, position))
            return InternalSelectorCompletionProvider.default;

        var InScore = SF.InScoreSection(document, position);

        if (InScore) {
            return InternalSelectorCompletionProvider.InofScore(document, position, context);
        }

        return InternalSelectorCompletionProvider.OutofScore(document, position);
    }
}

class InternalSelectorCompletionProvider {
    public static default: vscode.CompletionList = new vscode.CompletionList([
        Functions.createCompletionItem("@a", "All players", "Returns a selector that selects all players", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("@e", "All entities", "Returns a selector that selects all entities", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("@s", "Executing entity", "Returns a selector that selects the current executing entity", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("@r", "Random player/entity", "Returns a selector that a random player, if type is specified then entities are included, use c to target more entities", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("@p", "Nearest player", "Returns a selector that selects the nearest player from the execution location", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("\"<entity name>\"", "dummy player", "Returns a example for an named entity", vscode.CompletionItemKind.User)
    ]);

    public static letters: vscode.CompletionList = new vscode.CompletionList([
        Functions.createCompletionItem("a", "All players", "Returns a selector that selects all players", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("e", "All entities", "Returns a selector that selects all entities", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("s", "Executing entity", "Returns a selector that selects the current executing entity", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("r", "Random player/entity", "Returns a selector that a random player, if type is specified then entities are included, use c to target more entities", vscode.CompletionItemKind.User),
        Functions.createCompletionItem("p", "Nearest player", "Returns a selector that selects the nearest player from the execution location", vscode.CompletionItemKind.User)
    ]);

    public static firstitems: vscode.CompletionList = new vscode.CompletionList([
        Functions.createCompletionItem("tag=", "tag", "A tag test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("x=", "x", "An X Coordinate test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("y=", "y", "An Y Coordinate test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("z=", "z", "An Z Coordinate test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("dx=", "dx", "The length over X of the box to test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("dy=", "dy", "The length over Y of the box to test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("dz=", "dz", "The length over Z of the box to test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("scores={<name>=}", "scores", "The scores to test, can only be one", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("type=", "type", "The type of entity to find", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("c=", "c", "The amount of entities to limit to, negative numbers result in the entites at the end of the list", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("m=", "m", "The gamemode test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("r=", "r", "The minimum radius test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("rm=", "rm", "The maximumm radius test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("team=", "team", "The team test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("l=", "l", "The minimum xp level test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("lm=", "lm", "The maximum xp level test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("name=", "name", "The name of the entity, be be specified between quotes", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("rx=", "rx", "The minimum rotation of the X axis, or up and down, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("rxm=", "rxm", "The maximum rotation of the X axis, or up and down, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("ry=", "ry", "The minimum rotation of the Y axis, or left and right, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem("rym=", "rym", "The maximum rotation of the Y axis, or left and right, number included", vscode.CompletionItemKind.Property),
    ]);

    public static items: vscode.CompletionList = new vscode.CompletionList([
        Functions.createCompletionItem(",tag=", "tag", "A tag test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",x=", "x", "An X Coordinate test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",y=", "y", "An Y Coordinate test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",z=", "z", "An Z Coordinate test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",dx=", "dx", "The length over X of the box to test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",dy=", "dy", "The length over Y of the box to test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",dz=", "dz", "The length over Z of the box to test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",scores={<name>=}", "scores", "The scores to test, can only be one", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",type=", "type", "The type of entity to find", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",c=", "c", "The amount of entities to limit to, negative numbers result in the entites at the end of the list", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",m=", "m", "The gamemode test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",r=", "r", "The minimum radius test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",rm=", "rm", "The maximumm radius test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",team=", "team", "The team test", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",l=", "l", "The minimum xp level test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",lm=", "lm", "The maximum xp level test, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",name=", "name", "The name of the entity, be be specified between quotes", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",rx=", "rx", "The minimum rotation of the X axis, or up and down, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",rxm=", "rxm", "The maximum rotation of the X axis, or up and down, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",ry=", "ry", "The minimum rotation of the Y axis, or left and right, number included", vscode.CompletionItemKind.Property),
        Functions.createCompletionItem(",rym=", "rym", "The maximum rotation of the Y axis, or left and right, number included", vscode.CompletionItemKind.Property),
    ]);

    public static OutofScore(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var Line = document.lineAt(position.line);
        var PreviousChar = Line.text.charAt(position.character - 1);

        switch (PreviousChar) {
            case "{":

            case ",":
            case "[":
                return this.firstitems;

            case "@":
                return this.letters;

            case "=":
                var P = SF.GetParameterName(document, position);
                return this.SolveParameter(document, position, P);
        }

        PreviousChar = Line.text.charAt(position.character - 2);

        if (PreviousChar == "@") {
            var Out = new vscode.CompletionList();
            Out.items.push(Functions.createCompletionItem("[]", "[", "start the selector", vscode.CompletionItemKind.Snippet));
            return Out;
        }

        return;
    }

    public static InofScore(document: vscode.TextDocument, position: vscode.Position, context: vscode.CompletionContext | undefined): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        if (context?.triggerCharacter == "{" || context?.triggerCharacter == ",") {
            var Out = new vscode.CompletionList();

            mcfunctionDatabase.Symbols.Scores.forEach(document => {
                document.Values.forEach(symbol => {
                    Out.items.push(new vscode.CompletionItem(symbol.name, vscode.CompletionItemKind.Variable));
                });
            });

            return Out;
        }

        return;
    }

    public static SolveParameter(document: vscode.TextDocument, position: vscode.Position, parameter: string): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var Out = new vscode.CompletionList();
        var Data: Functions.DocumentDataCollection<vscode.SymbolInformation> | undefined;
        var Kind = vscode.CompletionItemKind.Variable;

        switch (parameter) {
            case "tag":
                Data = mcfunctionDatabase.Symbols.Tags;
                break;

            case "scores":
                Out.items.push(new vscode.CompletionItem("{", vscode.CompletionItemKind.Snippet))

                return Out;
            case "type":
                Data = mcfunctionDatabase.Symbols.Entities;

                break;
        }

        if (Data != undefined) {
            Data.forEach(document => {
                document.Values.forEach(symbol => {
                    Out.items.push(new vscode.CompletionItem(symbol.name, Kind));
                });
            });
        }

        return Out;
    }
}
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

import * as vscode from 'vscode';
import * as Functions from '../../general/include';
import * as SF from "../selectors/functions";
import { SelectorCompletionProvider, SelectorVscodeCompletionProvider } from "./types/SelectorCompletion";
import { SyntaxItem, createCompletionItem, copyCompletionItem } from '../../general/include';
import { CoordinateCompletionItemProvider } from './types/CoordinateCompletionProvider';
import { BooleanCompletionProvider } from './types/BooleanCompletion';
import { ItemCompletionItemProvider } from './types/ItemCompletionProvider';
import { IntegerCompletionItemProvider } from './types/IntegerCompletionProvider';
import { BlockCompletionItemProvider } from './types/BlockCompletionProvider';
import { EntityCompletionItemProvider } from './types/EntityCompletionProvider';
import { timeStamp } from 'console';
import { TagDiagnosticProvider } from '../diagnostics/commands/tagDiagnostics';
import { TagSignatureProvider } from '../signatures/Commands/TagSignatures';

export interface CompletionItemProvider {
    //
    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.CompletionItem[] | undefined;
}

export class CompletionItemManager implements vscode.CompletionItemProvider {

    public Completors: Map<string, CompletionItemProvider>;
    public StartItems: vscode.CompletionItem[];
    public Default: DefaultItems;

    public BooleanCompletionProvider: BooleanCompletionProvider;
    public BlockCompletionProvider: BlockCompletionItemProvider;
    public CoordinateCompletionProvider: CoordinateCompletionItemProvider;
    public EntityCompletionProvider: EntityCompletionItemProvider;
    public FloatCompletionProvider: CompletionItemProvider | undefined; //TODO
    public ItemCompletionProvider: ItemCompletionItemProvider;
    public IntegerCompletionProvider: IntegerCompletionItemProvider;
    public ParticleCompletionProvider: CompletionItemProvider | undefined; //TODO
    public PlaysoundCompletionProvider: CompletionItemProvider | undefined; //TODO
    public ScoreCompletionProvider: CompletionItemProvider | undefined; //TODO
    public SelectorCompletion: SelectorCompletionProvider;
    public SelectorVscodeCompletion: SelectorVscodeCompletionProvider;
    public TagCompletionProvider: CompletionItemProvider | undefined; //TODO
    public TickingAreaCompletionProvider: CompletionItemProvider | undefined; //TODO

    constructor() {
        this.Default = new DefaultItems();
        this.Completors = new Map<string, CompletionItemProvider>();

        this.BooleanCompletionProvider = new BooleanCompletionProvider();
        this.BlockCompletionProvider = new BlockCompletionItemProvider();
        this.CoordinateCompletionProvider = new CoordinateCompletionItemProvider();
        this.EntityCompletionProvider = new EntityCompletionItemProvider();
        this.IntegerCompletionProvider = new IntegerCompletionItemProvider();
        this.ItemCompletionProvider = new ItemCompletionItemProvider();
        this.SelectorCompletion = new SelectorCompletionProvider();
        this.SelectorVscodeCompletion = new SelectorVscodeCompletionProvider();

        //Starts items
        this.StartItems = [
            Functions.createCompletionItem("alwaysday", "alwaysday", "Locks and unlocks the day-night cycle."),
            Functions.createCompletionItem("clear", "clear", "Clears items from player inventory."),
            Functions.createCompletionItem("connect", "connect", "Attempts to connect to the websocket server on the provided URL."),
            Functions.createCompletionItem("clone", "clone", "Clones blocks from one region to another."),
            Functions.createCompletionItem("daylock", "daylock", "Locks and unlocks the day-night cycle."),
            Functions.createCompletionItem("deop", "deop", "Revokes operator status from a player."),
            Functions.createCompletionItem("difficulty", "difficulty", "Sets the difficulty level."),
            Functions.createCompletionItem("effect", "effect", "Add, Remove status effects."),
            Functions.createCompletionItem("enchant", "enchant", "Adds an echantment to a player's selected item."),
            Functions.createCompletionItem("execute", "execute", "Executes a command on behalf of one or more entities."),
            Functions.createCompletionItem("fill", "fill", "Fills all or parts of a region with a specific block."),
            Functions.createCompletionItem("function", "function", "Runs commands found in the corresponding function file."),
            Functions.createCompletionItem("gamemode", "gamemode", "Sets a player's game mode."),
            Functions.createCompletionItem("gamerule", "gamerule", "Whether command blocks should be enabled in-game."),
            Functions.createCompletionItem("give", "give", "Gives an item to a player."),
            Functions.createCompletionItem("kill", "kill", "Kills entities"),
            Functions.createCompletionItem("locate", "locate", "Display the coordinates for the closest structure of a given type."),
            Functions.createCompletionItem("me", "me", "Displays a message about yourself"),
            Functions.createCompletionItem("msg", "msg", "Sends a private message to one or more players."),
            Functions.createCompletionItem("mobevent", "mobevent", "Controls what mob events are allowed to run."),
            Functions.createCompletionItem("op", "op", "Grants operator status to a player."),
            Functions.createCompletionItem("particle", "particle", "Creates a particle emitter"),
            Functions.createCompletionItem("playsound", "playsound", "Plays a sound."),
            Functions.createCompletionItem("replaceitem", "replaceitem", "Replaces items in inventories"),
            Functions.createCompletionItem("reload", "reload", "Reloads all function files from all behaviour packs."),
            Functions.createCompletionItem("say", "say", "Sends a message in the chat to other players."),
            Functions.createCompletionItem("scoreboard", "scoreboard", "Lists all created variables in the scoreboard"),
            Functions.createCompletionItem("setblock", "setblock", "Changes a block to another block."),
            Functions.createCompletionItem("setmaxplayers", "setmaxplayers", "Sets the maximum number of players for this game session."),
            Functions.createCompletionItem("setworldspawn", "setworldspawn", "Sets the world spawn."),
            Functions.createCompletionItem("spawnpoint", "spawnpoint", "Sets the spawn point for a player."),
            Functions.createCompletionItem("spreadplayers", "spreadplayers", "Teleports entities to random locations."),
            Functions.createCompletionItem("stopsound", "stopsound", "Stops a sound."),
            Functions.createCompletionItem("summon", "summon", "Summons an entity."),
            Functions.createCompletionItem("tag", "tag", "Handle tags stored in entities"),
            Functions.createCompletionItem("tell", "tell", "Sends a private message to one or more players."),
            Functions.createCompletionItem("tellraw", "tellraw", "Sends a JSON message to players."),
            Functions.createCompletionItem("tp", "tp", "Teleports entities"),
            Functions.createCompletionItem("teleport", "teleport", "Teleports entities"),
            Functions.createCompletionItem("testfor", "testfor", "Counts entities maching specified conditions."),
            Functions.createCompletionItem("testforblocks", "testforblocks", "Tests whether the blocks in two regions match."),
            Functions.createCompletionItem("tickingarea", "tickingarea", "Add, remove or list ticking areas."),
            Functions.createCompletionItem("time", "time", "Changes or queries the world's game time."),
            Functions.createCompletionItem("title", "title", "Controls screen titles"),
            Functions.createCompletionItem("titleraw", "titleraw", "Controls screen titles with JSON messages."),
            Functions.createCompletionItem("toggledownfal", "toggledownfal", "Toggles the weather."),
            Functions.createCompletionItem("weather", "weather", "Sets the weather"),
            Functions.createCompletionItem("w", "w", "Sends a private message to one or more players."),
            Functions.createCompletionItem("xp", "xp", "Adds or removes player experience.")
        ];

        this.StartItems.forEach(x => x.kind = vscode.CompletionItemKind.Class);
    }

    set(Cm: CompletionItemProvider, keywords: string[]): void {
        keywords.forEach(word => this.Completors.set(word, Cm));
    }

    //
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var LineIndex = position.line;
        var Line = document.lineAt(LineIndex);

        if (Line.isEmptyOrWhitespace)
            return this.StartItems;

        if (Line.text.startsWith("#")) {
            return;
        }

        //Check if starts items should be filtered
        var Query = Line.text.substring(0, position.character);
        if (Query.indexOf(' ') < 0) {
            var Out = new Array<vscode.CompletionItem>();

            this.StartItems.forEach(x => {
                if (x == undefined)
                    return;

                if (x.label.startsWith(Query)) {
                    Out.push(x);
                }
            });

            return Out;
        }

        //If in selector provide selector
        if (SF.IsInSelector(document, position)) {
            return this.SelectorVscodeCompletion.provideCompletionItems(document, position, token, context);
        }

        //Explore what is already typed
        var Tree = Functions.SyntaxTree.ParseTree(Line, position);
        var Items = this.StartItems

        //If no line is typed return all
        var Item = Tree.Root;
        if (Item == undefined)
            return Items;

        //Get the first needed for this line
        var Diagnoser = this.Completors.get(Item.Text.text);

        //If no diagnoser is returned then an unknown command has been used
        if (Diagnoser != undefined) {
            var Temp = Diagnoser.provideCompletionItems(Item, this, document);

            if (Temp != undefined)
                Items = Temp;
        }

        //Filter on last item
        var Last = Tree.GetLast();
        if (Last == undefined)
            return Items;

        var Out = new Array<vscode.CompletionItem>();

        for (var I = 0; I < Items.length; I++) {
            var t = copyCompletionItem(Items[I]);
            t.range = Last.Text.ToRange(LineIndex);
            Out.push(t);
        }

        return Out;
    }
}


export class DefaultItems {
    public BlockData: vscode.CompletionItem[];
    public ItemData: vscode.CompletionItem[];
    public JsonItemComponents: vscode.CompletionItem[];
    public JsonTextComponents: vscode.CompletionItem[];
    public String: vscode.CompletionItem[];

    constructor() {
        this.BlockData = [createCompletionItem("-1", "Block Data", "An block data value", vscode.CompletionItemKind.Constant)];
        this.ItemData = [createCompletionItem("-1", "Item Data", "An item data value", vscode.CompletionItemKind.Constant)];

        this.JsonItemComponents = [
            createCompletionItem(
                "{ \"minecraft:can_destroy\": { \"blocks\": [ \"grass\" ]}, \"minecraft:can_place_on\": { \"blocks\": [ \"grass\" ]}}",
                "Json Item Components",
                "A snippet of json item components",
                vscode.CompletionItemKind.Snippet)];

        this.JsonTextComponents = [
            createCompletionItem(
                "{ \"rawtext\": [ { \"text\": \"\" }, \"\", { \"translate\": \"\" } ] }",
                "Json Text Components",
                "A snippet of json text components",
                vscode.CompletionItemKind.Snippet)];

        this.String = [
            createCompletionItem('""', '""', 'Add a string', vscode.CompletionItemKind.Snippet)
        ];
    }
}
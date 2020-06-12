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
import { SelectorCompletionProvider } from "./SelectorCompletion";

export class CompletionItemManager implements vscode.CompletionItemProvider {

    public SelectorCompletion : SelectorCompletionProvider;
    public StartItems : vscode.CompletionItem[];

    constructor(){
        this.SelectorCompletion = new SelectorCompletionProvider();
        this.StartItems = new Array<vscode.CompletionItem> (
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
        );
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var Line = document.lineAt(position.line);
        var Text = Line.text;

        if (position.character < 3){
            return this.StartItems;
        }

        //If in selector provide selector
        if (SF.IsInSelector(document, position)) {
            return this.SelectorCompletion.provideCompletionItems(document, position, token, context);;
        }

        var Tree : Functions.SyntaxTree = Functions.SyntaxTree.ParseTree(Line, position);        
    }
}
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

export class GameruleCompletionProvider implements CompletionItemProvider {

    public Gamerules: vscode.CompletionItem[];

    constructor() {
        this.Gamerules = new Array<vscode.CompletionItem>(
            createCompletionItem("commandblocksenabled", "commandblocksenabled", "Whether command blocks should be enabled in-game.", vscode.CompletionItemKind.Function),
            createCompletionItem("commandblockoutput", "commandblockoutput", "Whether command blocks should notify admins when they perform commands.", vscode.CompletionItemKind.Function),
            createCompletionItem("dodaylightcycle", "dodaylightcycle", "Whether the day-night cycle and moon phases progress.", vscode.CompletionItemKind.Function),
            createCompletionItem("doentitydrops", "doentitydrops", "Whether entities that are not mobs should have drops.", vscode.CompletionItemKind.Function),
            createCompletionItem("dofiretick", "dofiretick", "Whether fire should spread and naturally extinguish.", vscode.CompletionItemKind.Function),
            createCompletionItem("doinsomnia", "doinsomnia", "Whether phantoms can spawn in the nighttime.", vscode.CompletionItemKind.Function),
            createCompletionItem("immediaterespawn", "immediaterespawn", "Players respawn immediately without showing the death screen.", vscode.CompletionItemKind.Function),
            createCompletionItem("domobloot", "domobloot", "Whether mobs should drop items.", vscode.CompletionItemKind.Function),
            createCompletionItem("domobspawning", "domobspawning", "Whether mobs should naturally spawn. Does not affect monster spawners.", vscode.CompletionItemKind.Function),
            createCompletionItem("dotiledrops", "dotiledrops", "Whether blocks should have drops.", vscode.CompletionItemKind.Function),
            createCompletionItem("doweathercycle", "doweathercycle", "Whether the weather can change naturally. The /weather command can still change weather.", vscode.CompletionItemKind.Function),
            createCompletionItem("drowningdamage", "drowningdamage", "Whether the player should take damage when drowning.", vscode.CompletionItemKind.Function),
            createCompletionItem("falldamage", "falldamage", "Whether the player should take fall damage.", vscode.CompletionItemKind.Function),
            createCompletionItem("firedamage", "firedamage", "Whether the player should take fire damage.", vscode.CompletionItemKind.Function),
            createCompletionItem("keepinventory", "keepinventory", "Whether the player should keep items and experience in their inventory after death.", vscode.CompletionItemKind.Function),
            createCompletionItem("maxcommandchainlength", "maxcommandchainlength", "Determines the number at which the chain command block acts as a \"chain\".", vscode.CompletionItemKind.Function),
            createCompletionItem("mobgriefing", "mobgriefing", "Whether creepers, zombies, endermen, ghasts, withers, ender dragons, rabbits, sheep, villagers, silverfish, and snow golems should be able to change blocks and whether mobs can pick up items. This also affects the capability of zombie-like creatures like zombie pigmen and drowned to pathfind to turtle eggs. This will also prevent villagers from breeding.", vscode.CompletionItemKind.Function),
            createCompletionItem("naturalregeneration", "naturalregeneration", "Whether the player can regenerate health naturally if their hunger is full enough (doesn't affect external healing, such as golden apples, the Regeneration effect, etc.).", vscode.CompletionItemKind.Function),
            createCompletionItem("pvp", "pvp", "Whether the player can fight with other players.", vscode.CompletionItemKind.Function),
            createCompletionItem("randomtickspeed", "randomtickspeed", "How often a random block tick occurs (such as plant growth, leaf decay, etc.) per chunk section per game tick. 0 disables random ticks [needs testing], higher numbers increase random ticks. Setting to a high integer results in high speeds of decay and growth.", vscode.CompletionItemKind.Function),
            createCompletionItem("sendcommandfeedback", "sendcommandfeedback", "Whether the feedback from commands executed by a player should show up in chat. Also affects the default behavior of whether command blocks store their output text.", vscode.CompletionItemKind.Function),
            createCompletionItem("showcoordinates", "showcoordinates", "Whether the player's coordinates are displayed.", vscode.CompletionItemKind.Function),
            createCompletionItem("showdeathmessages", "showdeathmessages", "Whether death messages are put into chat when a player dies. Also affects whether a message is sent to the pet's owner when the pet dies.", vscode.CompletionItemKind.Function),
            createCompletionItem("spawnradius", "spawnradius", "The number of blocks outward from the world spawn coordinates that a player spawns in when first joining a server or when dying without a personal spawnpoint/.", vscode.CompletionItemKind.Function),
            createCompletionItem("tntexplodes", "tntexplodes", "Whether TNT explodes after activation.", vscode.CompletionItemKind.Function),
            createCompletionItem("showtags", "showtags", "Hides the \"Can place on\" and \"Can destroy\" block lists from item lore.", vscode.CompletionItemKind.Function)
        );
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): CompletionData {

        //gamerule [rule] [value]
        switch (Item.Count()) {
            case 0: //[rule]
                return this.Gamerules;

            case 1: //[value]
                let Rule = Item.Child;

                if (Rule == undefined) {
                    return this.Gamerules
                }

                switch (Rule.Text.text) {
                    case 'commandblocksenabled':
                    case 'commandblockoutput':
                    case 'dodaylightcycle':
                    case 'doentitydrops':
                    case 'dofiretick':
                    case 'doinsomnia':
                    case 'immediaterespawn':
                    case 'domobloot':
                    case 'domobspawning':
                    case 'dotiledrops':
                    case 'doweathercycle':
                    case 'drowningdamage':
                    case 'falldamage':
                    case 'firedamage':
                    case 'keepinventory':
                    case 'mobgriefing':
                    case 'naturalregeneration':
                    case 'pvp':
                    case 'randomtickspeed':
                    case 'sendcommandfeedback':
                    case 'showcoordinates':
                    case 'showdeathmessages':
                    case 'spawnradius':
                    case 'tntexplodes':
                    case 'showtags':
                        return Cm.BooleanCompletionProvider.default;

                    case 'maxcommandchainlength':
                        return Cm.IntegerCompletionProvider.provideCompletionItems(0, 10000, 1000);

                    default:
                        return this.Gamerules;
                }

            default:
                break;
        }

        return undefined;
    }
}
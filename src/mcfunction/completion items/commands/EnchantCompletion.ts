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

export class EnchantCompletionProvider implements CompletionItemProvider {

    public Effects: vscode.CompletionItem[];

    constructor() {
        this.Effects = new Array<vscode.CompletionItem>(
            createCompletionItem("absorption", "Absorption", "Adds damage absorption, higher levels give more absorption", vscode.CompletionItemKind.Constant),
            createCompletionItem("bad_omen", "Bad Omen", "Causes an illager raid to start upon entering a village (only received from an Illager captain upon its death)", vscode.CompletionItemKind.Constant),
            createCompletionItem("blindness", "Blindness", "Impairs vision and disables the ability to sprint and critical hit", vscode.CompletionItemKind.Constant),
            createCompletionItem("conduit_power", "Conduit Power", "Increases underwater visibility and mining speed, prevents drowning", vscode.CompletionItemKind.Constant),
            createCompletionItem("fatal_poison", "Fatal Poison", "Inflicts damage over time and potentially kills", vscode.CompletionItemKind.Constant),
            createCompletionItem("fire_resistance", "Fire Resistance", "Gives the immunity to fire and lava.", vscode.CompletionItemKind.Constant),
            createCompletionItem("haste", "Haste", "Increases mining and attack speed, higher levels increase the player's mining and attack speed", vscode.CompletionItemKind.Constant),
            createCompletionItem("health_boost", "Health Boost", "Increases maximum health, higher levels give the player more health", vscode.CompletionItemKind.Constant),
            createCompletionItem("village_hero", "Hero of the Village", "Gives discounts on trades", vscode.CompletionItemKind.Constant),
            createCompletionItem("hunger", "Hunger", "Increases food exhaustion, higher levels cause the player to starve quicker", vscode.CompletionItemKind.Constant),
            createCompletionItem("instant_damage", "Instant Damage", "Damages entities, heals undead, higher levels do more damage (opposite for undead)", vscode.CompletionItemKind.Constant),
            createCompletionItem("instant_health", "Instant Health", "Heals entities, damages undead, higher levels heal more health (opposite for undead)", vscode.CompletionItemKind.Constant),
            createCompletionItem("invisibility", "Invisibility", "Grants invisibility, making the player invisible (but not the item they hold or the armor they wear)", vscode.CompletionItemKind.Constant),
            createCompletionItem("jump_boost", "Jump Boost", "Increases jump height and reduces fall damage, higher levels make the player jump higher and reduces more fall damage", vscode.CompletionItemKind.Constant),
            createCompletionItem("levitation", "Levitation", "Floats entities upward", vscode.CompletionItemKind.Constant),
            createCompletionItem("mining_fatigue", "Mining Fatigue", "Decreases mining and attack speed, higher levels decrease the player's mining and attack speed", vscode.CompletionItemKind.Constant),
            createCompletionItem("nausea", "Nausea", "Wobbles and warps the screen", vscode.CompletionItemKind.Constant),
            createCompletionItem("night_vision", "Night Vision", "Negates darkness", vscode.CompletionItemKind.Constant),
            createCompletionItem("poison", "Poison", "Inflicts damage over time (but can't kill), higher levels do more damage per second", vscode.CompletionItemKind.Constant),
            createCompletionItem("regeneration", "Regeneration", "Regenerates health over time, higher levels make health regenerate quicker", vscode.CompletionItemKind.Constant),
            createCompletionItem("resistance", "Resistance", "Reduces damage, higher levels reduce more damage", vscode.CompletionItemKind.Constant),
            createCompletionItem("saturation", "Saturation", "Restores hunger and saturation", vscode.CompletionItemKind.Constant),
            createCompletionItem("slow_falling", "Slow Falling", "Decreases falling speed and negates fall damage", vscode.CompletionItemKind.Constant),
            createCompletionItem("slowness", "Slowness", "Decreases walking speed, higher levels make the player slower", vscode.CompletionItemKind.Constant),
            createCompletionItem("speed", "Speed", "Increases walking speed, higher levels make the player faster", vscode.CompletionItemKind.Constant),
            createCompletionItem("strength", "Strength", "Increases melee damage, higher levels make the player do more melee damage", vscode.CompletionItemKind.Constant),
            createCompletionItem("water_breathing", "Water Breathing", "Prevents drowning and lets the player breath underwater", vscode.CompletionItemKind.Constant),
            createCompletionItem("weakness", "Weakness", "Decreases melee damage, higher levels decrease more melee damage", vscode.CompletionItemKind.Constant),
            createCompletionItem("wither", "Wither", "Inflicts damage over time (can kill), higher levels do more damage per second", vscode.CompletionItemKind.Constant)            
        );
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //enchant <player: target> <int|Enchant Name> [level: int]        

        switch (Item.Count()) {
            case 0: //<player: target>
                return Cm.SelectorCompletion.provideCompletionItems();

            case 1: //<int|Enchant Name>
                return this.Effects;

            case 2: //[level: int]
                return Cm.IntegerCompletionProvider?.provideCompletionItems(Item, Cm, document);

            default:
                break;
        }

        return undefined;
    }
}
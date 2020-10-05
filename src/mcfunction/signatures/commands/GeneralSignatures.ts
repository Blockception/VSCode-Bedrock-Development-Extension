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

import { SignatureManager, SignatureItemProvider } from "../SignatureManager";
import * as vscode from "vscode";
import { SyntaxItem } from "../../../general/include";
import { SignatureHelp, ParameterInformation } from "vscode";

//No branching commands
export class GeneralSignatureProvider implements SignatureItemProvider {

    public SignatureProviders: Map<string, vscode.SignatureInformation>;

    provideSignature(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
        let Child = this.SignatureProviders.get(Item.Text.text);

        if (Child == undefined)
            return undefined;

        let Count = Item.Count();

        if (Count > Child.parameters.length)
            return undefined;

        Child.activeParameter = Count;

        let Out = new SignatureHelp();
        Out.signatures = [Child];
        Out.activeParameter = Count;

        return Out;
    }

    private newItem(key: string, label: string, documentation: string, parameters: vscode.ParameterInformation[]): void {
        let SI = new vscode.SignatureInformation(label, documentation);
        SI.parameters = parameters;

        this.SignatureProviders.set(key, SI);
    }

    constructor() {
        this.SignatureProviders = new Map<string, vscode.SignatureInformation>();

        this.newItem('alwaysday', 'alwaysday [lock: Boolean]', 'Locks and unlocks the day-night cycle.', [
            new ParameterInformation('[lock: Boolean]', '')
        ]);

        this.newItem('clear', 'clear [player: target] [itemName: Item] [data: int] [maxCount: int]', 'Clears items from player inventory.', [
            new ParameterInformation('[player: target]', ''),
            new ParameterInformation('[itemName: Item]', ''),
            new ParameterInformation('[data: int]', ''),
            new ParameterInformation('[maxCount: int]', '')
        ]);

        this.newItem('connect', 'connect <serverUri: text>', 'Attempts to connect to the websocket server on the provided URL.', [
            new ParameterInformation('<serverUri: text>', '')
        ]);

        this.newItem('daylock', 'daylock [lock: Boolean]', 'Locks and unlocks the day-night cycle.', [
            new ParameterInformation('[lock: Boolean]', '')
        ]);

        this.newItem('deop', 'deop <player: target>', 'Revokes operator status from a player.', [
            new ParameterInformation('[player: target]', '')
        ]);

        this.newItem('difficulty', 'difficulty <peaceful|easy|normal|hard|e|h|n|p|0|1|2|3>', 'Sets the difficulty level.', [
            new ParameterInformation('<peaceful|easy|normal|hard|e|h|n|p|0|1|2|3>', '')
        ]);

        this.newItem('enchant', 'enchant <player: target> <int|Enchant Name> [level: int]', 'Adds an echantment to a player\'s selected item.', [
            new ParameterInformation('<player: target>', ''),
            new ParameterInformation('<int|Enchant Name>', ''),
            new ParameterInformation('[level: int]', '')
        ]);

        this.newItem('function', 'function <function|filepath>', 'Runs commands found in the corresponding function file.', [
            new ParameterInformation('<function|filepath>', '')
        ]);

        this.newItem('gamemode', 'gamemode <0|1|2|s|d|c|a|adventure|creative|default|survival> [player: target]', 'Sets a player\'s game mode.', [
            new ParameterInformation('<0|1|2|s|d|c|a|adventure|creative|default|survival>', ''),
            new ParameterInformation('[player: target]', '')
        ]);

        this.newItem('give', 'give <player: target> <itemName: Item> [amount: int] [data: int] [components: json]', 'Gives an item to a player.', [
            new ParameterInformation('', '')
        ]);

        this.newItem('kill', 'kill [target: target]', 'Kills entities', [
            new ParameterInformation('[target: target]', '')
        ]);

        this.newItem('me', 'me <message: message>', 'Displays a message about yourself', [
            new ParameterInformation('<message: message>', '')
        ]);

        this.newItem('msg', 'msg <target: target> <message: message>', 'Sends a private message to one or more players.', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<message: message>', '')
        ]);

        this.newItem('op', 'op <player: target>', 'Grants operator status to a player.', [
            new ParameterInformation('<player: target>', '')
        ]);

        this.newItem('particle', 'particle <effect: string> <position: x> <position: y> <position: z>', 'Creates a particle emitter', [
            new ParameterInformation('<effect: string>', ''),
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', '')
        ]);

        this.newItem('playsound', 'playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]', 'Plays a sound.', [
            new ParameterInformation('<sound: string>', ''),
            new ParameterInformation('[player: target]', ''),
            new ParameterInformation('[position: x y z]', ''),
            new ParameterInformation('[volume: float]', ''),
            new ParameterInformation('[pitch: float]', ''),
            new ParameterInformation('[minimumVolume: float]', '')
        ]);

        this.newItem('reload', 'reload', 'Reloads all function files from all behaviour packs.', []);

        this.newItem('say', 'say <message: message>', 'Sends a message in the chat to other players.', [
            new ParameterInformation('<message: message>', '')
        ]);

        this.newItem('setblock', 'setblock <position: x> <position: y> <position: z> <tileName: Block> [tileData: int] [replace|destroy|keep]', 'Changes a block to another block.', [
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', ''),
            new ParameterInformation('<tileName: Block>', ''),
            new ParameterInformation('[tileData: int]', ''),
            new ParameterInformation('[replace|destroy|keep]', '')
        ]);

        this.newItem('setmaxplayers', 'setmaxplayers <maxPlayers: int>', 'Sets the maximum number of players for this game session.', [
            new ParameterInformation('<maxPlayers: int>', '')
        ]);

        this.newItem('setworldspawn', 'setworldspawn [spawnPoint: x] [spawnPoint: y] [spawnPoint: z]', 'Sets the world spawn.', [
            new ParameterInformation('[spawnPoint: x]', ''),
            new ParameterInformation('[spawnPoint: y]', ''),
            new ParameterInformation('[spawnPoint: z]', '')
        ]);

        this.newItem('spawnpoint', 'spawnpoint [player: target] [spawnPoint: x] [spawnPoint: y] [spawnPoint: z]', 'Sets the spawn point for a player.', [
            new ParameterInformation('[player: target]', ''),
            new ParameterInformation('[spawnPoint: x]', ''),
            new ParameterInformation('[spawnPoint: y]', ''),
            new ParameterInformation('[spawnPoint: z]', '')
        ]);

        this.newItem('spreadplayers', 'spreadplayers <x: value> <z: value> <spreadDistance: float> <maxRange: float> <victim: target>', 'Teleports entities to random locations.', [
            new ParameterInformation('<x: value>', ''),
            new ParameterInformation('<z: value>', ''),
            new ParameterInformation('<spreadDistance: float>', ''),
            new ParameterInformation('<maxRange: float>', ''),
            new ParameterInformation('<victim: target>', '')
        ]);

        this.newItem('stopsound', 'stopsound <player: target> [sound: string]', 'Stops a sound.', [
            new ParameterInformation('<player: target>', ''),
            new ParameterInformation('[sound: string]', '')
        ]);

        this.newItem('tell', 'tell <target: target> <message: message>', 'Sends a private message to one or more players.', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<message: message>', '')
        ]);

        this.newItem('tellraw', 'tellraw <player: target> { \"rawtext\": [ { \"text\": \"\" }, \"\", { \"translate\": \"\" } ] }', 'Sends a JSON message to players.', [
            new ParameterInformation('<player: target>', ''),
            new ParameterInformation('[components: json]', '')
        ]);

        this.newItem('testfor', 'testfor <victim: target>', 'Counts entities maching specified conditions.', [
            new ParameterInformation('', '')
        ]);

        this.newItem('testforblock', 'testforblock <position: x> <position: y> <position: z> <tileName: Block> [dataValue: int]', 'Tests whether a certain block is in a specific location.', [
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', ''),
            new ParameterInformation('<tileName: Block>', ''),
            new ParameterInformation('[dataValue: int]', '')
        ]);

        this.newItem('testforblocks', 'testforblocks <begin: x> <begin: y> <begin: z> <end: x> <end: y> <end: z> <destination: x> <destination: y> <destination: z> [masked|all]', 'Tests whether the blocks in two regions match.', [
            new ParameterInformation('<begin: x>', ''),
            new ParameterInformation('<begin: y>', ''),
            new ParameterInformation('<begin: z>', ''),
            new ParameterInformation('<end: x>', ''),
            new ParameterInformation('<end: y>', ''),
            new ParameterInformation('<end: z>', ''),
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('[masked|all]', '')
        ]);        

        this.newItem('toggledownfall', 'toggledownfall', 'Toggles the weather.', []);

        this.newItem('weather', 'weather <clear|rain|thunder> [duration: int]', 'Sets the weather', [
            new ParameterInformation('<clear|rain|thunder>', ''),
            new ParameterInformation('[duration: int]', '')
        ]);

        this.newItem('w', 'w <target: target> <message: message>', 'Sends a private message to one or more players.', [
            new ParameterInformation('<target: target>', 'The entites/players to target'),
            new ParameterInformation('<message: message>', 'The message to send')
        ]);

        this.newItem('xp', 'xp <amount: int> [player: target]', 'Add or remove xp from players', [
            new ParameterInformation('<amount: int>', 'The amount of xp or levels (if suffix is L) to add or remove.'),
            new ParameterInformation('[player: target]', 'The player to add or remove xp to/from')
        ]);
    }
}

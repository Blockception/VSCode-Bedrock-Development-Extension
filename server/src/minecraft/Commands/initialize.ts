import { combineClientFeatures, Command } from 'vscode-languageserver';
import { Manager } from '../../Manager';
import { MCCommand } from './MCCommand';
import { MCCommandParameter } from './MCCommandParameter';
import { MCCommandParameterType } from './MCCommandParameterType';

/*BSD 3-Clause License

Copyright (c) 2020, blockception Ltd
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
function add(parameters: MCCommandParameter[], name: string, description: string) {
	let com = new MCCommand();
	com.description = description;
	com.name = name;
	com.parameters = parameters;

	Manager.Commands.add(com);
}

export function AddCommands(): void {
	//ability
	add([new MCCommandParameter("ability", MCCommandParameterType.keyword, true)], "ability", "Grants or revokes a player ability.");

	//ability <Player: selector>
	add([
		new MCCommandParameter("ability", MCCommandParameterType.keyword, true),
		new MCCommandParameter("Player", MCCommandParameterType.selector, true)
	],
		"ability",
		"Grants or revokes a player ability."
	);
	//ability <Player: selector> mayfly [value: boolean]
	add([
		new MCCommandParameter("ability", MCCommandParameterType.keyword, true),
		new MCCommandParameter("Player", MCCommandParameterType.selector, true),
		new MCCommandParameter("mayfly", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"ability",
		"Grants or revokes a player ability to fly"
	);
	//ability <Player: selector> mute [value boolean]
	add([
		new MCCommandParameter("ability", MCCommandParameterType.keyword, true),
		new MCCommandParameter("Player", MCCommandParameterType.selector, true),
		new MCCommandParameter("mute", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"ability",
		"Grants or revokes a player ability to speak"
	);
	//ability <Player: selector> worldbuilder [value: boolean]
	add([
		new MCCommandParameter("ability", MCCommandParameterType.keyword, true),
		new MCCommandParameter("Player", MCCommandParameterType.selector, true),
		new MCCommandParameter("worldbuilder", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"ability",
		"Grants or revokes a player ability to build"
	);


	add([
		new MCCommandParameter("alwaysday", MCCommandParameterType.keyword, true),
		new MCCommandParameter("lock", MCCommandParameterType.boolean, false)
	],
		"alwaysday",
		"Locks and unlocks the day-night cycle."
	);

	add([new MCCommandParameter("classroommode", MCCommandParameterType.keyword, true)], "classroommode", "Ability to edit restricted blocks.");

	add([
		new MCCommandParameter("clear", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false),
		new MCCommandParameter("itemName", MCCommandParameterType.item, false),
		new MCCommandParameter("data", MCCommandParameterType.keyword, false),
		new MCCommandParameter("maxCount", MCCommandParameterType.keyword, false)
	],
		"clear",
		"Clears items from player inventory."
	);

	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("replace", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("replace", MCCommandParameterType.keyword, true),
		new MCCommandParameter("normal", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("replace", MCCommandParameterType.keyword, true),
		new MCCommandParameter("force", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("replace", MCCommandParameterType.keyword, true),
		new MCCommandParameter("move", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("masked", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("masked", MCCommandParameterType.keyword, true),
		new MCCommandParameter("normal", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("masked", MCCommandParameterType.keyword, true),
		new MCCommandParameter("force", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("masked", MCCommandParameterType.keyword, true),
		new MCCommandParameter("move", MCCommandParameterType.keyword, true)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("filtered", MCCommandParameterType.keyword, true),
		new MCCommandParameter("normal", MCCommandParameterType.keyword, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("filtered", MCCommandParameterType.keyword, true),
		new MCCommandParameter("force", MCCommandParameterType.keyword, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false)
	],
		"clone",
		"Copies blocks from one place to another."
	);
	add([
		new MCCommandParameter("clone", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("filtered", MCCommandParameterType.keyword, true),
		new MCCommandParameter("move", MCCommandParameterType.keyword, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false)
	],
		"clone",
		"Copies blocks from one place to another."
	);

	add([new MCCommandParameter("code", MCCommandParameterType.keyword, true)], "code", "	Used to access code connection.");

	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("peaceful", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"	Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("easy", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("normal", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("hard", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("0", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("1", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("2", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("difficulty", MCCommandParameterType.keyword, true),
		new MCCommandParameter("3", MCCommandParameterType.keyword, true)
	],
		"difficulty",
		"Sets the difficulty level."
	);

	add([
		new MCCommandParameter("effect", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("effect", MCCommandParameterType.effect, true),
		new MCCommandParameter("seconds", MCCommandParameterType.keyword, false),
		new MCCommandParameter("amplifier", MCCommandParameterType.keyword, false),
		new MCCommandParameter("hide particles", MCCommandParameterType.boolean, false)
	],
		"effect",
		"Sets the difficulty level."
	);
	add([
		new MCCommandParameter("effect", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("clear", MCCommandParameterType.keyword, true)
	],
		"effect",
		"Sets the difficulty level."
	);

	add([
		new MCCommandParameter("enchant", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("id", MCCommandParameterType.keyword, true),
		new MCCommandParameter("level", MCCommandParameterType.keyword, false)
	],
		"enchant",
		"Enchants a player item."
	);
	add([
		new MCCommandParameter("enchant", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("id", MCCommandParameterType.keyword, true),
		new MCCommandParameter("level", MCCommandParameterType.keyword, false)
	],
		"enchant",
		"Enchants a player item."
	);

	add([
		new MCCommandParameter("execute", MCCommandParameterType.keyword, true),
		new MCCommandParameter("origin", MCCommandParameterType.selector, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("command", MCCommandParameterType.command, true)
	],
		"execute",
		"Executes another command."
	);
	add([
		new MCCommandParameter("execute", MCCommandParameterType.keyword, true),
		new MCCommandParameter("origin", MCCommandParameterType.selector, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("detect", MCCommandParameterType.keyword, true),
		new MCCommandParameter("detectPos x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("detectPos y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("detectPos z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("block", MCCommandParameterType.block, true),
		new MCCommandParameter("data", MCCommandParameterType.keyword, true),
		new MCCommandParameter("command", MCCommandParameterType.command, true)
	],
		"execute",
		"Executes another command."
	);

	add([
		new MCCommandParameter("fill", MCCommandParameterType.keyword, true),
		new MCCommandParameter("from x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, true),
		new MCCommandParameter("replace", MCCommandParameterType.keyword, true),
		new MCCommandParameter("replaceTileName", MCCommandParameterType.block, false),
		new MCCommandParameter("replaceDataValue", MCCommandParameterType.keyword, false)
	],
		"fill",
		"Fills a region with a specific block."
	);
	add([
		new MCCommandParameter("fill", MCCommandParameterType.keyword, true),
		new MCCommandParameter("from x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("outline", MCCommandParameterType.keyword, true)
	],
		"fill",
		"Fills a region with a specific block."
	);
	add([
		new MCCommandParameter("fill", MCCommandParameterType.keyword, true),
		new MCCommandParameter("from x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("hollow", MCCommandParameterType.keyword, true)
	],
		"fill",
		"Fills a region with a specific block."
	);
	add([
		new MCCommandParameter("fill", MCCommandParameterType.keyword, true),
		new MCCommandParameter("from x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("destroy", MCCommandParameterType.keyword, true)
	],
		"fill",
		"Fills a region with a specific block."
	);
	add([
		new MCCommandParameter("fill", MCCommandParameterType.keyword, true),
		new MCCommandParameter("from x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("keep", MCCommandParameterType.keyword, true)
	],
		"fill",
		"Fills a region with a specific block."
	);

	add([
		new MCCommandParameter("function", MCCommandParameterType.keyword, true),
		new MCCommandParameter("function", MCCommandParameterType.function, true)
	],
		"function",
		"Runs a function."
	);

	add([
		new MCCommandParameter("gamemode", MCCommandParameterType.keyword, true),
		new MCCommandParameter("0", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"gamemode",
		"Sets a player's game mode."
	);
	add([
		new MCCommandParameter("gamemode", MCCommandParameterType.keyword, true),
		new MCCommandParameter("1", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"gamemode",
		"Sets a player's game mode."
	);
	add([
		new MCCommandParameter("gamemode", MCCommandParameterType.keyword, true),
		new MCCommandParameter("2", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"gamemode",
		"Sets a player's game mode."
	);
	add([
		new MCCommandParameter("gamemode", MCCommandParameterType.keyword, true),
		new MCCommandParameter("s", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"gamemode",
		"Sets a player's game mode."
	);
	add([
		new MCCommandParameter("gamemode", MCCommandParameterType.keyword, true),
		new MCCommandParameter("c", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"gamemode",
		"Sets a player's game mode."
	);
	add([
		new MCCommandParameter("gamemode", MCCommandParameterType.keyword, true),
		new MCCommandParameter("a", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"gamemode",
		"Sets a player's game mode."
	);

	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("commandblockOutput", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("commandblocksEnabled", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doDaylightCycle", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doEntityDrops", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doFireTick", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doInsomnia", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doMobLoot", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doMobSpawning", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doTileDrops", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("doWeatherCycle", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("drowningdamage", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("falldamage", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("firedamage", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("keepInventory", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("maxCommandChainLength", MCCommandParameterType.keyword, true),
		new MCCommandParameter("int", MCCommandParameterType.keyword, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("mobGriefing", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("naturalRegeneration", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("pvp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("randomTickSpeed", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("sendCommandFeedback", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("showDeathMessages", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("showcoordinates", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);
	add([
		new MCCommandParameter("gamerule", MCCommandParameterType.keyword, true),
		new MCCommandParameter("tntexplodes", MCCommandParameterType.keyword, true),
		new MCCommandParameter("value", MCCommandParameterType.boolean, false)
	],
		"gamerule",
		"Sets or queries a game rule value."
	);

	add([
		new MCCommandParameter("give", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("itemName", MCCommandParameterType.item, true),
		new MCCommandParameter("amount", MCCommandParameterType.keyword, false),
		new MCCommandParameter("data", MCCommandParameterType.keyword, false),
		new MCCommandParameter("components", MCCommandParameterType.keyword, false)
	],
		"give",
		"Gives an item to a player."
	);

	add([
		new MCCommandParameter("kill", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, false)
	],
		"kill",
		"Kills entities (players, mobs, items, etc.)."
	);

	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("buriedtreasure", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("endcity", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("fortress", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("mansion", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("mineshaft", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("monument", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("pillageroutpost", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("ruins", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("shipwreck", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("stronghold", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("temple", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("locate", MCCommandParameterType.keyword, true),
		new MCCommandParameter("village", MCCommandParameterType.keyword, true)
	],
		"locate",
		"TODO description"
	);
	add([
		new MCCommandParameter("me", MCCommandParameterType.keyword, true),
		new MCCommandParameter("message", MCCommandParameterType.keyword, true)
	],
		"me",
		"TODO description"
	);
	add([
		new MCCommandParameter("msg", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("message", MCCommandParameterType.keyword, true)
	],
		"msg",
		"TODO description"
	);
	add([
		new MCCommandParameter("op", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true)
	],
		"op",
		"TODO description"
	);
	add([
		new MCCommandParameter("particle", MCCommandParameterType.keyword, true),
		new MCCommandParameter("effect", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true)
	],
		"particle",
		"TODO description"
	);

	add([
		new MCCommandParameter("playsound", MCCommandParameterType.keyword, true),
		new MCCommandParameter("sound", MCCommandParameterType.sound, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("volume", MCCommandParameterType.float, false),
		new MCCommandParameter("pitch", MCCommandParameterType.float, false),
		new MCCommandParameter("minimumVolume", MCCommandParameterType.float, false)
	],
		"playsound",
		"TODO description"
	);
	add([
		new MCCommandParameter("replaceitem", MCCommandParameterType.keyword, true),
		new MCCommandParameter("block", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("slot.container", MCCommandParameterType.keyword, true),
		new MCCommandParameter("slotId", MCCommandParameterType.keyword, true),
		new MCCommandParameter("itemName", MCCommandParameterType.item, true),
		new MCCommandParameter("amount", MCCommandParameterType.keyword, false),
		new MCCommandParameter("data", MCCommandParameterType.keyword, false),
		new MCCommandParameter("components", MCCommandParameterType.keyword, false)
	],
		"replaceitem",
		"TODO description"
	);
	add([
		new MCCommandParameter("replaceitem", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("slotType", MCCommandParameterType.keyword, true),
		new MCCommandParameter("slotId", MCCommandParameterType.keyword, true),
		new MCCommandParameter("itemName", MCCommandParameterType.item, true),
		new MCCommandParameter("amount", MCCommandParameterType.keyword, false),
		new MCCommandParameter("data", MCCommandParameterType.keyword, false),
		new MCCommandParameter("components", MCCommandParameterType.keyword, false)
	],
		"replaceitem",
		"TODO description"
	);
	add([
		new MCCommandParameter("say", MCCommandParameterType.keyword, true),
		new MCCommandParameter("message", MCCommandParameterType.keyword, true)
	],
		"say",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objectives", MCCommandParameterType.keyword, true),
		new MCCommandParameter("add", MCCommandParameterType.keyword, true),
		new MCCommandParameter("name", MCCommandParameterType.keyword, true),
		new MCCommandParameter("dummy", MCCommandParameterType.keyword, true),
		new MCCommandParameter("display name", MCCommandParameterType.keyword, false)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objectives", MCCommandParameterType.keyword, true),
		new MCCommandParameter("list", MCCommandParameterType.keyword, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objectives", MCCommandParameterType.keyword, true),
		new MCCommandParameter("remove", MCCommandParameterType.keyword, true),
		new MCCommandParameter("name", MCCommandParameterType.objective, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objectives", MCCommandParameterType.keyword, true),
		new MCCommandParameter("setdisplay", MCCommandParameterType.keyword, true),
		new MCCommandParameter("list", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objectives", MCCommandParameterType.keyword, true),
		new MCCommandParameter("setdisplay", MCCommandParameterType.keyword, true),
		new MCCommandParameter("sidebar", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objectives", MCCommandParameterType.keyword, true),
		new MCCommandParameter("setdisplay", MCCommandParameterType.keyword, true),
		new MCCommandParameter("below_name", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("add", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, true),
		new MCCommandParameter("count", MCCommandParameterType.keyword, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("list", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, false)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("operation", MCCommandParameterType.keyword, true),
		new MCCommandParameter("destination", MCCommandParameterType.selector, true),
		new MCCommandParameter("destination", MCCommandParameterType.objective, true),
		new MCCommandParameter("operation", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.keyword, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("random", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, true),
		new MCCommandParameter("min", MCCommandParameterType.keyword, true),
		new MCCommandParameter("max", MCCommandParameterType.keyword, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("remove", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, true),
		new MCCommandParameter("count", MCCommandParameterType.keyword, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("reset", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("set", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, true),
		new MCCommandParameter("score", MCCommandParameterType.keyword, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("scoreboard", MCCommandParameterType.keyword, true),
		new MCCommandParameter("players", MCCommandParameterType.keyword, true),
		new MCCommandParameter("test", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entity", MCCommandParameterType.selector, true),
		new MCCommandParameter("objective", MCCommandParameterType.objective, true),
		new MCCommandParameter("min", MCCommandParameterType.keyword, true),
		new MCCommandParameter("max", MCCommandParameterType.keyword, true)
	],
		"scoreboard",
		"TODO description"
	);
	add([
		new MCCommandParameter("setblock", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("replace", MCCommandParameterType.keyword, false)
	],
		"setblock",
		"TODO description"
	);
	add([
		new MCCommandParameter("setblock", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("destroy", MCCommandParameterType.keyword, false)
	],
		"setblock",
		"TODO description"
	);
	add([
		new MCCommandParameter("setblock", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("tileData", MCCommandParameterType.keyword, false),
		new MCCommandParameter("|keep", MCCommandParameterType.keyword, false)
	],
		"setblock",
		"TODO description"
	);
	add([
		new MCCommandParameter("setworldspawn", MCCommandParameterType.keyword, true),
		new MCCommandParameter("spawnPoint", MCCommandParameterType.keyword, false)
	],
		"setworldspawn",
		"TODO description"
	);
	add([
		new MCCommandParameter("spawnpoint", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false),
		new MCCommandParameter("spawnPos x", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos y", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos z", MCCommandParameterType.coordinate, false)
	],
		"spawnpoint",
		"TODO description"
	);
	add([
		new MCCommandParameter("spreadplayers", MCCommandParameterType.keyword, true),
		new MCCommandParameter("x", MCCommandParameterType.keyword, true),
		new MCCommandParameter("z", MCCommandParameterType.keyword, true),
		new MCCommandParameter("spreadDistance", MCCommandParameterType.float, true),
		new MCCommandParameter("maxRange", MCCommandParameterType.float, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true)
	],
		"spreadplayers",
		"TODO description"
	);
	add([
		new MCCommandParameter("stopsound", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("sound", MCCommandParameterType.sound, false)
	],
		"stopsound",
		"TODO description"
	);

	add([
		new MCCommandParameter("summon", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entityType", MCCommandParameterType.keyword, true),
		new MCCommandParameter("spawnPos x", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos y", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos z", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnevent", MCCommandParameterType.event, false),
		new MCCommandParameter("name", MCCommandParameterType.keyword, false)
	],
		"summon",
		"TODO description"
	);
	add([
		new MCCommandParameter("summon", MCCommandParameterType.keyword, true),
		new MCCommandParameter("entityType", MCCommandParameterType.keyword, true),
		new MCCommandParameter("name", MCCommandParameterType.keyword, false),
		new MCCommandParameter("spawnPos x", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos y", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos z", MCCommandParameterType.coordinate, false)
	],
		"summon",
		"TODO description"
	);

	add([
		new MCCommandParameter("tag", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("add", MCCommandParameterType.keyword, true),
		new MCCommandParameter("name", MCCommandParameterType.tag, true)
	],
		"tag",
		"TODO description"
	);
	add([
		new MCCommandParameter("tag", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("list", MCCommandParameterType.keyword, true)
	],
		"tag",
		"TODO description"
	);
	add([
		new MCCommandParameter("tag", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("remove", MCCommandParameterType.keyword, true),
		new MCCommandParameter("name", MCCommandParameterType.tag, true)
	],
		"tag",
		"TODO description"
	);
	add([
		new MCCommandParameter("tell", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("message", MCCommandParameterType.keyword, true)
	],
		"tell",
		"TODO description"
	);

	add([
		new MCCommandParameter("tellraw", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.keyword, true),
		new MCCommandParameter("json", MCCommandParameterType.jsonRawText, true)
	],
		"tellraw",
		"TODO description"
	);
	add([
		new MCCommandParameter("testfor", MCCommandParameterType.keyword, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true)
	],
		"testfor",
		"TODO description"
	);
	add([
		new MCCommandParameter("testforblock", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("position z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("tileName", MCCommandParameterType.block, true),
		new MCCommandParameter("dataValue", MCCommandParameterType.keyword, false)
	],
		"testforblock",
		"TODO description"
	);
	add([
		new MCCommandParameter("testforblocks", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true)
	],
		"testforblocks",
		"TODO description"
	);
	add([
		new MCCommandParameter("testforblocks", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("all", MCCommandParameterType.keyword, true)
	],
		"testforblocks",
		"TODO description"
	);
	add([
		new MCCommandParameter("testforblocks", MCCommandParameterType.keyword, true),
		new MCCommandParameter("begin x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("begin z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("end z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("masked", MCCommandParameterType.keyword, true)
	],
		"testforblocks",
		"TODO description"
	);
	add([
		new MCCommandParameter("tickingarea", MCCommandParameterType.keyword, true),
		new MCCommandParameter("add", MCCommandParameterType.keyword, true),
		new MCCommandParameter("from x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("from z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("to z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("name", MCCommandParameterType.keyword, false)
	],
		"tickingarea",
		"TODO description"
	);
	add([
		new MCCommandParameter("tickingarea", MCCommandParameterType.keyword, true),
		new MCCommandParameter("add", MCCommandParameterType.keyword, true),
		new MCCommandParameter("circle", MCCommandParameterType.keyword, true),
		new MCCommandParameter("center x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("center y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("center z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("radius", MCCommandParameterType.keyword, true),
		new MCCommandParameter("name", MCCommandParameterType.keyword, false)
	],
		"tickingarea",
		"TODO description"
	);
	add([
		new MCCommandParameter("tickingarea", MCCommandParameterType.keyword, true),
		new MCCommandParameter("list", MCCommandParameterType.keyword, true),
		new MCCommandParameter("all-dimensions", MCCommandParameterType.keyword, false)
	],
		"tickingarea",
		"TODO description"
	);
	add([
		new MCCommandParameter("tickingarea", MCCommandParameterType.keyword, true),
		new MCCommandParameter("remove", MCCommandParameterType.keyword, true),
		new MCCommandParameter("position", MCCommandParameterType.keyword, true)
	],
		"tickingarea",
		"TODO description"
	);
	add([
		new MCCommandParameter("tickingarea", MCCommandParameterType.keyword, true),
		new MCCommandParameter("remove_all", MCCommandParameterType.keyword, true)
	],
		"tickingarea",
		"TODO description"
	);
	add([
		new MCCommandParameter("time", MCCommandParameterType.keyword, true),
		new MCCommandParameter("add", MCCommandParameterType.keyword, true),
		new MCCommandParameter("amount", MCCommandParameterType.keyword, true)
	],
		"time",
		"TODO description"
	);
	add([
		new MCCommandParameter("time", MCCommandParameterType.keyword, true),
		new MCCommandParameter("query", MCCommandParameterType.keyword, true),
		new MCCommandParameter("daytime", MCCommandParameterType.keyword, true)
	],
		"time",
		"TODO description"
	);
	add([
		new MCCommandParameter("time", MCCommandParameterType.keyword, true),
		new MCCommandParameter("query", MCCommandParameterType.keyword, true),
		new MCCommandParameter("gametime", MCCommandParameterType.keyword, true)
	],
		"time",
		"TODO description"
	);
	add([
		new MCCommandParameter("time", MCCommandParameterType.keyword, true),
		new MCCommandParameter("query", MCCommandParameterType.keyword, true),
		new MCCommandParameter("day", MCCommandParameterType.keyword, true)
	],
		"time",
		"TODO description"
	);
	add([
		new MCCommandParameter("time", MCCommandParameterType.keyword, true),
		new MCCommandParameter("set", MCCommandParameterType.keyword, true),
		new MCCommandParameter("amount", MCCommandParameterType.keyword, true)
	],
		"time",
		"TODO description"
	);
	add([
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("titleText", MCCommandParameterType.keyword, true)
	],
		"title",
		"TODO description"
	);
	add([
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("subtitle", MCCommandParameterType.keyword, true),
		new MCCommandParameter("titleText", MCCommandParameterType.keyword, true)
	],
		"title",
		"TODO description"
	);
	add([
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("actionbar> <titleText", MCCommandParameterType.keyword, true)
	],
		"title",
		"TODO description"
	);
	add([
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("clear", MCCommandParameterType.keyword, true)
	],
		"title",
		"TODO description"
	);
	add([
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("reset", MCCommandParameterType.keyword, true)
	],
		"title",
		"TODO description"
	);
	add([
		new MCCommandParameter("title", MCCommandParameterType.keyword, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, true),
		new MCCommandParameter("times", MCCommandParameterType.keyword, true),
		new MCCommandParameter("fadeIn", MCCommandParameterType.keyword, true),
		new MCCommandParameter("stay", MCCommandParameterType.keyword, true),
		new MCCommandParameter("fadeOut", MCCommandParameterType.keyword, true)
	],
		"title",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("destination", MCCommandParameterType.selector, true),
		new MCCommandParameter("yRot", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("xRot", MCCommandParameterType.coordinate, false)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("destination", MCCommandParameterType.selector, true),
		new MCCommandParameter("facing", MCCommandParameterType.keyword, true),
		new MCCommandParameter("lookAtEntity", MCCommandParameterType.selector, true)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("yRot", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("xRot", MCCommandParameterType.coordinate, false)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true),
		new MCCommandParameter("destination x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("destination z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("yRot", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("xRot", MCCommandParameterType.coordinate, false)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true),
		new MCCommandParameter("destination", MCCommandParameterType.selector, true),
		new MCCommandParameter("facing", MCCommandParameterType.keyword, true),
		new MCCommandParameter("lookAtEntity", MCCommandParameterType.selector, true)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true),
		new MCCommandParameter("x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("facing", MCCommandParameterType.keyword, true),
		new MCCommandParameter("lookAtEntity", MCCommandParameterType.selector, true)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true),
		new MCCommandParameter("destination", MCCommandParameterType.selector, true),
		new MCCommandParameter("facing", MCCommandParameterType.keyword, true),
		new MCCommandParameter("lookAt x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("lookAt y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("lookAt z", MCCommandParameterType.coordinate, true)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("tp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("victim", MCCommandParameterType.selector, true),
		new MCCommandParameter("x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("z", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("facing", MCCommandParameterType.keyword, true),
		new MCCommandParameter("lookAt x", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("lookAt y", MCCommandParameterType.coordinate, true),
		new MCCommandParameter("lookAt z", MCCommandParameterType.coordinate, true)
	],
		"tp",
		"TODO description"
	);
	add([
		new MCCommandParameter("w", MCCommandParameterType.keyword, true),
		new MCCommandParameter("selector", MCCommandParameterType.selector, true),
		new MCCommandParameter("message", MCCommandParameterType.keyword, true)
	],
		"w",
		"TODO description"
	);
	add([
		new MCCommandParameter("weather", MCCommandParameterType.keyword, true),
		new MCCommandParameter("clear", MCCommandParameterType.keyword, true),
		new MCCommandParameter("duration", MCCommandParameterType.keyword, false)
	],
		"weather",
		"TODO description"
	);
	add([
		new MCCommandParameter("weather", MCCommandParameterType.keyword, true),
		new MCCommandParameter("rain", MCCommandParameterType.keyword, true),
		new MCCommandParameter("duration", MCCommandParameterType.keyword, false)
	],
		"weather",
		"TODO description"
	);
	add([
		new MCCommandParameter("weather", MCCommandParameterType.keyword, true),
		new MCCommandParameter("thunder", MCCommandParameterType.keyword, true),
		new MCCommandParameter("duration", MCCommandParameterType.keyword, false)
	],
		"weather",
		"TODO description"
	);

	add([
		new MCCommandParameter("xp", MCCommandParameterType.keyword, true),
		new MCCommandParameter("amount", MCCommandParameterType.xp, true),
		new MCCommandParameter("player", MCCommandParameterType.selector, false)
	],
		"xp",
		"TODO description"
	);
}

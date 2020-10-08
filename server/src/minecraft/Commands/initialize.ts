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
import { Manager } from '../../Manager';
import { MCCommand } from './MCCommand';
import { MCCommandParameter } from './MCCommandParameter';
import { MCCommandParameterType } from './MCCommandParameterType';

function add(parameters: MCCommandParameter[], name: string, description: string) {
	let com = new MCCommand();
	com.documentation = { value: description, kind: 'markdown' };
	com.name = name;
	com.parameters = parameters;

	Manager.Commands.add(com);
}

export function AddCommands(): void {
	const booleanOptional = new MCCommandParameter("value", MCCommandParameterType.boolean, false);
	const selectorPlayerRequired = new MCCommandParameter("Player", MCCommandParameterType.selectorPlayer);
	const selectorPlayerOptional = new MCCommandParameter("Player", MCCommandParameterType.selectorPlayer, false);
	const selectorRequired = new MCCommandParameter("selector", MCCommandParameterType.selector);
	const selectorOptional = new MCCommandParameter("selector", MCCommandParameterType.selector, false);

	const beginXR = new MCCommandParameter("begin x", MCCommandParameterType.coordinate);
	const beginYR = new MCCommandParameter("begin y", MCCommandParameterType.coordinate);
	const beginZR = new MCCommandParameter("begin z", MCCommandParameterType.coordinate);
	const endXR = new MCCommandParameter("end x", MCCommandParameterType.coordinate);
	const endYR = new MCCommandParameter("end y", MCCommandParameterType.coordinate);
	const endZR = new MCCommandParameter("end z", MCCommandParameterType.coordinate);
	const destinationXR = new MCCommandParameter("destination x", MCCommandParameterType.coordinate);
	const destinationYR = new MCCommandParameter("destination y", MCCommandParameterType.coordinate);
	const destinationZR = new MCCommandParameter("destination z", MCCommandParameterType.coordinate);

	const positionXR = new MCCommandParameter("position x", MCCommandParameterType.coordinate);
	const positionYR = new MCCommandParameter("position y", MCCommandParameterType.coordinate);
	const positionZR = new MCCommandParameter("position z", MCCommandParameterType.coordinate);

	const JsonText = new MCCommandParameter('json raw text', MCCommandParameterType.jsonRawText);

	const AddKeyWord = new MCCommandParameter('add');


	const abilityCommand = new MCCommandParameter("ability");
	//[EDU] 
	//ability
	add([abilityCommand], "ability", "**[EDU]** Grants or revokes a player ability.");

	//ability <Player: selector>
	add([abilityCommand, selectorPlayerRequired], "ability", "**[EDU]** Returns a list of abillities assigned to the specified player");
	//ability <Player: selector> mayfly [value: boolean]
	add([abilityCommand, selectorPlayerRequired, new MCCommandParameter("mayfly"), booleanOptional],
		"ability", "**[EDU]** Grants or revokes a player ability to fly");
	//ability <Player: selector> mute [value boolean]
	add([abilityCommand, selectorPlayerRequired, new MCCommandParameter("mute"), booleanOptional],
		"ability", "**[EDU]** Grants or revokes a player ability to speak");
	//ability <Player: selector> worldbuilder [value: boolean]
	add([abilityCommand, selectorPlayerRequired, new MCCommandParameter("worldbuilder"), booleanOptional],
		"ability", "**[EDU]** Grants or revokes a player ability to build");

	//alwaysday [lock: boolean]
	add([new MCCommandParameter("alwaysday"), new MCCommandParameter("lock", MCCommandParameterType.boolean, false)],
		"alwaysday", "Locks and unlocks the day-night cycle.");

	//Clear [player : selector] [item : Item] [data : Integer] [maxCount : Integer]
	add([new MCCommandParameter("clear"),
		selectorPlayerOptional,
	new MCCommandParameter("itemName", MCCommandParameterType.item, false),
	new MCCommandParameter("data", MCCommandParameterType.integer, false),
	new MCCommandParameter("maxCount", MCCommandParameterType.integer, false)
	], "clear", "Clears items from player inventory.");


	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate>
	add([new MCCommandParameter("clone"), beginXR, beginYR, beginZR, endXR, endYR, endZR, destinationXR, destinationYR, destinationZR],
		"clone", "Copies blocks from one place to another.");
	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> replace
	add([new MCCommandParameter("clone"), beginXR, beginYR, beginZR, endXR, endYR, endZR, destinationXR, destinationYR, destinationZR, new MCCommandParameter("replace")],
		"clone", "Copies blocks from one place to another.");
	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> replace normal
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("replace"),
	new MCCommandParameter("normal")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> replace force
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("replace"),
	new MCCommandParameter("force")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> replace move
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("replace"),
	new MCCommandParameter("move")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> masked
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("masked")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> masked normal
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("masked"),
	new MCCommandParameter("normal")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> masked force
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("masked"),
	new MCCommandParameter("force")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> masked move
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("masked"),
	new MCCommandParameter("move")
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> filtered normal <tileName : block> [tileData : integer]
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("filtered"),
	new MCCommandParameter("normal"),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false)
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> filtered force <tileName : block> [tileData : integer]
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("filtered"),
	new MCCommandParameter("force"),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false)
	], "clone", "Copies blocks from one place to another.");

	//clone <begin x y z : coordinate> <end x y z : coordinate> <destination x y z : coordinate> filtered move <tileName : block> [tileData : integer]
	add([new MCCommandParameter("clone"),
		beginXR, beginYR, beginZR, endXR, endYR, endZR,
		destinationXR, destinationYR, destinationZR,
	new MCCommandParameter("filtered"),
	new MCCommandParameter("move"),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false)
	], "clone", "Copies blocks from one place to another.");


	//difficulty <mode>
	const DifficultyCommand = new MCCommandParameter("difficulty");

	add([DifficultyCommand, new MCCommandParameter("peaceful")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("easy")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("normal")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("hard")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("p")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("e")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("n")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("h")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("0")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("1")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("2")], "difficulty", "Sets the difficulty level.");
	add([DifficultyCommand, new MCCommandParameter("3")], "difficulty", "Sets the difficulty level.");

	//effect
	add([new MCCommandParameter("effect"),
		selectorPlayerRequired,
	new MCCommandParameter("effect", MCCommandParameterType.effect),
	new MCCommandParameter("seconds", MCCommandParameterType.integer, false),
	new MCCommandParameter("amplifier", MCCommandParameterType.integer, false),
	new MCCommandParameter("hide particles", MCCommandParameterType.boolean, false)
	], "effect", "Sets the difficulty level.");
	add([new MCCommandParameter("effect"),
		selectorPlayerRequired,
	new MCCommandParameter("clear")
	], "effect", "Sets the difficulty level.");

	add([new MCCommandParameter("enchant"),
		selectorPlayerRequired,
	new MCCommandParameter("id", MCCommandParameterType.integer),
	new MCCommandParameter("level", MCCommandParameterType.integer, false)
	], "enchant", "Enchants a player item.");

	add([new MCCommandParameter("enchant"),
		selectorPlayerRequired,
	new MCCommandParameter("id"),
	new MCCommandParameter("level", MCCommandParameterType.keyword, false)
	], "enchant", "Enchants a player item.");


	add([new MCCommandParameter("execute"),
	new MCCommandParameter("origin", MCCommandParameterType.selector),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("command", MCCommandParameterType.command)
	], "execute", "Executes another command.");

	add([new MCCommandParameter("execute"),
	new MCCommandParameter("origin", MCCommandParameterType.selector),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("detect"),
	new MCCommandParameter("detectPos x", MCCommandParameterType.coordinate),
	new MCCommandParameter("detectPos y", MCCommandParameterType.coordinate),
	new MCCommandParameter("detectPos z", MCCommandParameterType.coordinate),
	new MCCommandParameter("block", MCCommandParameterType.block),
	new MCCommandParameter("data", MCCommandParameterType.integer),
	new MCCommandParameter("command", MCCommandParameterType.command)
	], "execute", "Executes another command.");



	add([new MCCommandParameter("fill"),
	new MCCommandParameter("from x", MCCommandParameterType.coordinate),
	new MCCommandParameter("from y", MCCommandParameterType.coordinate),
	new MCCommandParameter("from z", MCCommandParameterType.coordinate),
	new MCCommandParameter("to x", MCCommandParameterType.coordinate),
	new MCCommandParameter("to y", MCCommandParameterType.coordinate),
	new MCCommandParameter("to z", MCCommandParameterType.coordinate),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer),
	new MCCommandParameter("replace"),
	new MCCommandParameter("replaceTileName", MCCommandParameterType.block, false),
	new MCCommandParameter("replaceDataValue", MCCommandParameterType.integer, false)
	], "fill", "Fills a region with a specific block.");

	add([new MCCommandParameter("fill"),
	new MCCommandParameter("from x", MCCommandParameterType.coordinate),
	new MCCommandParameter("from y", MCCommandParameterType.coordinate),
	new MCCommandParameter("from z", MCCommandParameterType.coordinate),
	new MCCommandParameter("to x", MCCommandParameterType.coordinate),
	new MCCommandParameter("to y", MCCommandParameterType.coordinate),
	new MCCommandParameter("to z", MCCommandParameterType.coordinate),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("outline")
	], "fill", "Fills a region with a specific block.");

	add([new MCCommandParameter("fill"),
	new MCCommandParameter("from x", MCCommandParameterType.coordinate),
	new MCCommandParameter("from y", MCCommandParameterType.coordinate),
	new MCCommandParameter("from z", MCCommandParameterType.coordinate),
	new MCCommandParameter("to x", MCCommandParameterType.coordinate),
	new MCCommandParameter("to y", MCCommandParameterType.coordinate),
	new MCCommandParameter("to z", MCCommandParameterType.coordinate),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("hollow")
	], "fill", "Fills a region with a specific block.");

	add([new MCCommandParameter("fill"),
	new MCCommandParameter("from x", MCCommandParameterType.coordinate),
	new MCCommandParameter("from y", MCCommandParameterType.coordinate),
	new MCCommandParameter("from z", MCCommandParameterType.coordinate),
	new MCCommandParameter("to x", MCCommandParameterType.coordinate),
	new MCCommandParameter("to y", MCCommandParameterType.coordinate),
	new MCCommandParameter("to z", MCCommandParameterType.coordinate),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("destroy")
	], "fill", "Fills a region with a specific block.");

	add([new MCCommandParameter("fill"),
	new MCCommandParameter("from x", MCCommandParameterType.coordinate),
	new MCCommandParameter("from y", MCCommandParameterType.coordinate),
	new MCCommandParameter("from z", MCCommandParameterType.coordinate),
	new MCCommandParameter("to x", MCCommandParameterType.coordinate),
	new MCCommandParameter("to y", MCCommandParameterType.coordinate),
	new MCCommandParameter("to z", MCCommandParameterType.coordinate),
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("keep")
	], "fill", "Fills a region with a specific block.");


	add([new MCCommandParameter("function"),
	new MCCommandParameter("function path", MCCommandParameterType.function)
	], "function", "Runs a function.");


	//gamemode <gamemode> [target]
	add([new MCCommandParameter("gamemode"),
	new MCCommandParameter("gamemode", MCCommandParameterType.gamemode),
		selectorPlayerOptional
	], "gamemode", "Sets a player's game mode.");


	//gamerule
	const GamemodeCommand = new MCCommandParameter("gamerule");
	const IntegerOptional = new MCCommandParameter("int", MCCommandParameterType.integer, false);

	add([GamemodeCommand, new MCCommandParameter("commandblockoutput"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("commandblocksenabled"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("dodaylightcycle"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("doentitydrops"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("dofiretick"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("doimmediaterespawn"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("doinsomnia"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("domobloot"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("domobspawning"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("dotiledrops"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("doweathercycle"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("drowningdamage"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("falldamage"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("firedamage"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("functioncommandlimit"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("keepinventory"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("maxcommandchainlength"), IntegerOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("mobgriefing"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("naturalregeneration"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("pvp"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("randomtickspeed"), IntegerOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("sendcommandfeedback"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("showcoordinates"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("showdeathmessages"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("showtags"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("spawnradius"), booleanOptional], "gamerule", "Sets or queries a game rule value.");
	add([GamemodeCommand, new MCCommandParameter("tntexplodes"), booleanOptional], "gamerule", "Sets or queries a game rule value.");

	add([new MCCommandParameter("give"), selectorPlayerRequired, new MCCommandParameter("itemName", MCCommandParameterType.item), new MCCommandParameter("amount", MCCommandParameterType.keyword, false), new MCCommandParameter("data", MCCommandParameterType.keyword, false),
	new MCCommandParameter("components", MCCommandParameterType.keyword, false)
	], "give", "Gives an item to a player.");


	add([new MCCommandParameter("kill"),
	new MCCommandParameter("selector", MCCommandParameterType.selector, false)
	], "kill", "Kills entities (players, mobs, items, etc.).");


	//locate	
	add([new MCCommandParameter("locate"), new MCCommandParameter("feature", MCCommandParameterType.locateFeature)],
		"locate", "Displays the coordiantes for the closest structure of a given type.");

	add([new MCCommandParameter("me"),
	new MCCommandParameter("message")
	], "me", "TODO description");

	add([new MCCommandParameter("msg"),
	new MCCommandParameter("selector", MCCommandParameterType.selector),
	new MCCommandParameter("message")
	], "msg", "TODO description");

	add([new MCCommandParameter("op"),
		selectorPlayerRequired
	], "op", "TODO description");

	add([new MCCommandParameter("particle"),
	new MCCommandParameter("effect"),
	positionXR,
	positionYR,
	positionZR
	], "particle", "TODO description");


	add([new MCCommandParameter("playsound"),
	new MCCommandParameter("sound", MCCommandParameterType.sound),
		selectorPlayerOptional,
	new MCCommandParameter("position x", MCCommandParameterType.coordinate, false),
	new MCCommandParameter("position y", MCCommandParameterType.coordinate, false),
	new MCCommandParameter("position z", MCCommandParameterType.coordinate, false),
	new MCCommandParameter("volume", MCCommandParameterType.float, false),
	new MCCommandParameter("pitch", MCCommandParameterType.float, false),
	new MCCommandParameter("minimumVolume", MCCommandParameterType.float, false)
	], "playsound", "TODO description");


	//replaceitem block <position> slot.container <slotId> <itemName> [amount] [data] [components]
	add([new MCCommandParameter("replaceitem"),
	new MCCommandParameter("block"),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("slot.container", MCCommandParameterType.slotType),
	new MCCommandParameter("slotId", MCCommandParameterType.slotID),
	new MCCommandParameter("itemName", MCCommandParameterType.item),
	new MCCommandParameter("amount", MCCommandParameterType.keyword, false),
	new MCCommandParameter("data", MCCommandParameterType.keyword, false),
	new MCCommandParameter("components", MCCommandParameterType.keyword, false)
	], "replaceitem", "TODO description");

	//replaceitem block <position> slot.container <slotId> <replacemode> <itemName> [amount] [data] [components]
	add([new MCCommandParameter("replaceitem"),
	new MCCommandParameter("block"),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("slot.container", MCCommandParameterType.slotType),
	new MCCommandParameter("slotId", MCCommandParameterType.slotID),
	new MCCommandParameter("replacemode", MCCommandParameterType.replaceMode),
	new MCCommandParameter("itemName", MCCommandParameterType.item),
	new MCCommandParameter("amount", MCCommandParameterType.keyword, false),
	new MCCommandParameter("data", MCCommandParameterType.keyword, false),
	new MCCommandParameter("components", MCCommandParameterType.keyword, false)
	], "replaceitem", "TODO description");

	//replaceitem entity <target> <slotType> <slotId> <itemName> [amount] [data] [components]
	add([new MCCommandParameter("replaceitem"),
	new MCCommandParameter("entity"),
	new MCCommandParameter("selector", MCCommandParameterType.selector),
	new MCCommandParameter("slotType", MCCommandParameterType.slotType),
	new MCCommandParameter("slotId", MCCommandParameterType.slotID),
	new MCCommandParameter("itemName", MCCommandParameterType.item),
	new MCCommandParameter("amount", MCCommandParameterType.integer, false),
	new MCCommandParameter("data", MCCommandParameterType.integer, false),
	new MCCommandParameter("components", MCCommandParameterType.jsonItem, false)
	], "replaceitem", "TODO description");

	//replaceitem entity <target> <slotType> <slotId> <replacemode> <itemName> [amount] [data] [components]
	add([new MCCommandParameter("replaceitem"),
	new MCCommandParameter("entity"),
	new MCCommandParameter("selector", MCCommandParameterType.selector),
	new MCCommandParameter("slot type", MCCommandParameterType.slotType),
	new MCCommandParameter("slot id", MCCommandParameterType.slotID),
	new MCCommandParameter("replace mode", MCCommandParameterType.replaceMode),
	new MCCommandParameter("item name", MCCommandParameterType.item),
	new MCCommandParameter("amount", MCCommandParameterType.integer, false),
	new MCCommandParameter("data", MCCommandParameterType.integer, false),
	new MCCommandParameter("components", MCCommandParameterType.jsonItem, false)
	], "replaceitem", "TODO description");


	add([new MCCommandParameter("say"),
	new MCCommandParameter("message", MCCommandParameterType.unknown)
	], "say", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("objectives"),
	new MCCommandParameter("add"),
	new MCCommandParameter("name", MCCommandParameterType.objective),
	new MCCommandParameter("dummy"),
	new MCCommandParameter("display name", MCCommandParameterType.string, false)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("objectives"),
	new MCCommandParameter("list")
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("objectives"),
	new MCCommandParameter("remove"),
	new MCCommandParameter("name", MCCommandParameterType.objective)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("objectives"),
	new MCCommandParameter("setdisplay"),
	new MCCommandParameter("list"),
	new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("objectives"),
	new MCCommandParameter("setdisplay"),
	new MCCommandParameter("sidebar"),
	new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("objectives"),
	new MCCommandParameter("setdisplay"),
	new MCCommandParameter("below_name"),
	new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("add"),
	new MCCommandParameter("entity", MCCommandParameterType.selector),
	new MCCommandParameter("objective", MCCommandParameterType.objective),
	new MCCommandParameter("count")
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("list"),
	new MCCommandParameter("entity", MCCommandParameterType.selector, false)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("operation"),
	new MCCommandParameter("destination", MCCommandParameterType.selector),
	new MCCommandParameter("destination", MCCommandParameterType.objective),
	new MCCommandParameter("operation"),
	new MCCommandParameter("selector"),
	new MCCommandParameter("objective", MCCommandParameterType.objective)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("random"),
	new MCCommandParameter("entity", MCCommandParameterType.selector),
	new MCCommandParameter("objective", MCCommandParameterType.objective),
	new MCCommandParameter("min"),
	new MCCommandParameter("max")
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("remove"),
	new MCCommandParameter("entity", MCCommandParameterType.selector),
	new MCCommandParameter("objective", MCCommandParameterType.objective),
	new MCCommandParameter("count")
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("reset"),
	new MCCommandParameter("entity", MCCommandParameterType.selector),
	new MCCommandParameter("objective", MCCommandParameterType.objective, false)
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("set"),
	new MCCommandParameter("entity", MCCommandParameterType.selector),
	new MCCommandParameter("objective", MCCommandParameterType.objective),
	new MCCommandParameter("score")
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("scoreboard"),
	new MCCommandParameter("players"),
	new MCCommandParameter("test"),
	new MCCommandParameter("entity", MCCommandParameterType.selector),
	new MCCommandParameter("objective", MCCommandParameterType.objective),
	new MCCommandParameter("min"),
	new MCCommandParameter("max")
	], "scoreboard", "TODO description");

	add([new MCCommandParameter("setblock"),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("replace", MCCommandParameterType.keyword, false)
	], "setblock", "TODO description");

	add([new MCCommandParameter("setblock"),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("destroy", MCCommandParameterType.keyword, false)
	], "setblock", "TODO description");

	add([new MCCommandParameter("setblock"),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("tileName", MCCommandParameterType.block),
	new MCCommandParameter("tileData", MCCommandParameterType.integer, false),
	new MCCommandParameter("|keep", MCCommandParameterType.keyword, false)
	], "setblock", "TODO description");

	add([new MCCommandParameter("setworldspawn"),
	new MCCommandParameter("spawnPoint", MCCommandParameterType.keyword, false)
	], "setworldspawn", "TODO description");

	add([new MCCommandParameter("spawnpoint"),
		selectorPlayerOptional,
	new MCCommandParameter("spawnPos x", MCCommandParameterType.coordinate, false),
	new MCCommandParameter("spawnPos y", MCCommandParameterType.coordinate, false),
	new MCCommandParameter("spawnPos z", MCCommandParameterType.coordinate, false)
	], "spawnpoint", "TODO description");

	add([new MCCommandParameter("spreadplayers"),
	new MCCommandParameter("x"),
	new MCCommandParameter("z"),
	new MCCommandParameter("spreadDistance", MCCommandParameterType.float),
	new MCCommandParameter("maxRange", MCCommandParameterType.float),
	new MCCommandParameter("victim", MCCommandParameterType.selector)
	], "spreadplayers", "TODO description");


	add([new MCCommandParameter("stopsound"),
		selectorPlayerRequired,
	new MCCommandParameter("sound", MCCommandParameterType.sound, false)
	], "stopsound", "TODO description");


	//summon
	const SummonCommand = new MCCommandParameter("summon");

	add([SummonCommand,
		new MCCommandParameter("entityType"),
		new MCCommandParameter("spawnPos x", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos y", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos z", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnevent", MCCommandParameterType.event, false),
		new MCCommandParameter("name", MCCommandParameterType.string, false)
	], "summon", "Summons an entity");

	add([SummonCommand,
		new MCCommandParameter("entityType"),
		new MCCommandParameter("name", MCCommandParameterType.string, false),
		new MCCommandParameter("spawnPos x", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos y", MCCommandParameterType.coordinate, false),
		new MCCommandParameter("spawnPos z", MCCommandParameterType.coordinate, false)
	], "summon", "Summons an entity");

	//tag
	const TagCommand = new MCCommandParameter("tag");
	const TagName = new MCCommandParameter("name", MCCommandParameterType.tag);

	add([TagCommand, selectorRequired, AddKeyWord, TagName], "tag", "Manages tags stored in entities");
	add([TagCommand, selectorRequired, new MCCommandParameter("list")], "tag", "Manages tags stored in entities");
	add([TagCommand, selectorRequired, new MCCommandParameter("remove"), TagName], "tag", "Manages tags stored in entities");

	//tell
	add([new MCCommandParameter("tell"), selectorPlayerRequired, new MCCommandParameter("message")],
		"tell", "Sends a private message to one or more players");

	//tellraw <player> <json components>
	add([new MCCommandParameter("tellraw"), selectorPlayerRequired, JsonText],
		"tellraw", "Sends a json messsage to players.");

	//testfor
	add([new MCCommandParameter("testfor"), new MCCommandParameter("victim", MCCommandParameterType.selector)],
		"testfor", "Counts entities (players, mobs, items, etc.) matching specified conditions");

	//testforblock
	add([new MCCommandParameter("testforblock"),
	positionXR,
	positionYR,
	positionZR,
	new MCCommandParameter("tile name", MCCommandParameterType.block),
	new MCCommandParameter("data value", MCCommandParameterType.integer, false)
	], "testforblock", "tests whether a certain block is a specific location");

	//testforblocks
	const TestForBlocksCommand = new MCCommandParameter("testforblocks");
	add([TestForBlocksCommand, beginXR, beginYR, beginZR, endXR, endYR, endZR, destinationXR, destinationYR, destinationZR],
		"testforblocks", "Tests whether the blocks in two regions match");

	add([TestForBlocksCommand, beginXR, beginYR, beginZR, endXR, endYR, endZR, destinationXR, destinationYR, destinationZR, new MCCommandParameter("all")],
		"testforblocks", "Tests whether the blocks in two regions match");

	add([TestForBlocksCommand, beginXR, beginYR, beginZR, endXR, endYR, endZR, destinationXR, destinationYR, destinationZR, new MCCommandParameter("masked")],
		"testforblocks", "Tests whether the blocks in two regions match");

	//tickingarea
	const TickingAreaCommand = new MCCommandParameter("tickingarea");
	const TickingAreaName = new MCCommandParameter('name', MCCommandParameterType.string, false);

	add([TickingAreaCommand, AddKeyWord, beginXR, beginYR, beginZR, endXR, endYR, endZR, TickingAreaName
	], "tickingarea", "Add, remove, or list ticking areas");

	add([TickingAreaCommand,
		AddKeyWord,
		new MCCommandParameter("circle"),
		new MCCommandParameter("center x", MCCommandParameterType.coordinate),
		new MCCommandParameter("center y", MCCommandParameterType.coordinate),
		new MCCommandParameter("center z", MCCommandParameterType.coordinate),
		new MCCommandParameter("radius"),
		TickingAreaName
	], "tickingarea", "Add, remove, or list ticking areas");

	add([TickingAreaCommand, new MCCommandParameter("list"), new MCCommandParameter("all-dimensions", MCCommandParameterType.keyword, false)
	], "tickingarea", "Add, remove, or list ticking areas");

	add([TickingAreaCommand, new MCCommandParameter("remove"), new MCCommandParameter("position")
	], "tickingarea", "Add, remove, or list ticking areas");

	add([TickingAreaCommand, new MCCommandParameter("remove_all")
	], "tickingarea", "Add, remove, or list ticking areas");

	//time
	const TimeCommand = new MCCommandParameter("time");

	add([TimeCommand,
		new MCCommandParameter("add"),
		new MCCommandParameter("amount", MCCommandParameterType.integer)
	], "time", "Add to the world's game time");

	add([TimeCommand, new MCCommandParameter("query"), new MCCommandParameter("daytime")],
		"time", "Changes or queries the world's game time");

	add([TimeCommand,
		new MCCommandParameter("query"),
		new MCCommandParameter("gametime", MCCommandParameterType.integer)
	], "time", "Queries the world's game time");

	add([TimeCommand,
		new MCCommandParameter("query"),
		new MCCommandParameter("day")
	], "time", "Changes or queries the world's game time");

	add([TimeCommand,
		new MCCommandParameter("set"),
		new MCCommandParameter("amount", MCCommandParameterType.integer)
	], "time", "Sets the world's game time");

	//title <target> 
	const TitleCommand = new MCCommandParameter("title");
	const SubTitleCommand = new MCCommandParameter("subtitle");
	const ActionbarCommand = new MCCommandParameter("actionbar");
	const TitleMessageString = new MCCommandParameter("titleText", MCCommandParameterType.string)

	add([TitleCommand, selectorPlayerRequired, TitleCommand, TitleMessageString], "title", "Sets the title");
	add([TitleCommand, selectorPlayerRequired, SubTitleCommand, TitleMessageString], "title", "Sets the sub titles");
	add([TitleCommand, selectorPlayerRequired, ActionbarCommand, TitleMessageString], "title", "Sets the action bar");
	add([TitleCommand, selectorPlayerRequired, new MCCommandParameter("clear")], "title", "TODO description");
	add([TitleCommand, selectorPlayerRequired, new MCCommandParameter("reset")], "title", "TODO description");
	add([TitleCommand, selectorPlayerRequired,
		new MCCommandParameter("times"),
		new MCCommandParameter("fade in", MCCommandParameterType.integer),
		new MCCommandParameter("stay", MCCommandParameterType.integer),
		new MCCommandParameter("fade out", MCCommandParameterType.integer)
	], "title", "Set the timings");

	//titleraw
	const TitleRawCommand = new MCCommandParameter("titleraw");

	add([TitleRawCommand, selectorPlayerRequired, TitleCommand, JsonText], "titleraw", "Sets the title");
	add([TitleRawCommand, selectorPlayerRequired, SubTitleCommand, JsonText], "titleraw", "Sets the sub titles");
	add([TitleRawCommand, selectorPlayerRequired, ActionbarCommand, JsonText], "titleraw", "Sets the action bar");
	add([TitleRawCommand, selectorPlayerRequired, new MCCommandParameter("clear")], "titleraw", "TODO description");
	add([TitleRawCommand, selectorPlayerRequired, new MCCommandParameter("reset")], "titleraw", "TODO description");
	add([TitleRawCommand, selectorPlayerRequired,
		new MCCommandParameter("times"),
		new MCCommandParameter("fade in", MCCommandParameterType.integer),
		new MCCommandParameter("stay", MCCommandParameterType.integer),
		new MCCommandParameter("fade out", MCCommandParameterType.integer)
	], "titleraw", "Set the timings");

	//toggledownfall
	add([new MCCommandParameter('toggledownfall')], 'toggledownfall', 'Toggles the weather');

	//tp
	const TpCommand = new MCCommandParameter("tp");
	const YRotOptional = new MCCommandParameter("yRot", MCCommandParameterType.coordinate, false);
	const XRotOptional = new MCCommandParameter("xRot", MCCommandParameterType.coordinate, false);
	const TpFacing = new MCCommandParameter("facing");
	const TpDestination = new MCCommandParameter("destination", MCCommandParameterType.selector);
	const TpCheckBlocks = new MCCommandParameter("check for blocks", MCCommandParameterType.boolean, false);
	const TpVictim = new MCCommandParameter("victim", MCCommandParameterType.selector);

	//tp <destination : Selector> [check for blocks]
	add([TpCommand, TpDestination, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <destination X Y Z> [check for blocks]
	add([TpCommand, destinationXR, destinationYR, destinationZR, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <victim : Selector> <destination : Selector> [check for blocks]
	add([TpCommand, TpVictim, TpDestination, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <victim : Selector> <destination X Y Z> [check for blocks]
	add([TpCommand, TpVictim, destinationXR, destinationYR, destinationZR, TpCheckBlocks], "tp", "Teleport Entities");

	//tp <destination : Selector> [xRot] [yRot] [check for blocks]
	add([TpCommand, TpDestination, YRotOptional, XRotOptional, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <destination X Y Z> [xRot] [yRot] [check for blocks]
	add([TpCommand, destinationXR, destinationYR, destinationZR, YRotOptional, XRotOptional, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <victim : Selector> <destination : Selector> [xRot] [yRot] [check for blocks]
	add([TpCommand, TpVictim, TpDestination, TpFacing, YRotOptional, XRotOptional, TpCheckBlocks], "tp", "TODO description");
	//tp <victim : Selector> <destination X Y Z> [xRot] [yRot] [check for blocks]
	add([TpCommand, TpVictim, destinationXR, destinationYR, destinationZR, YRotOptional, XRotOptional, TpCheckBlocks], "tp", "Teleport Entities");

	const TPLookAtEntity = new MCCommandParameter("look at", MCCommandParameterType.selector)
	const TPLookAtX = new MCCommandParameter("look at x", MCCommandParameterType.coordinate)
	const TPLookAtY = new MCCommandParameter("look at y", MCCommandParameterType.coordinate)
	const TPLookAtZ = new MCCommandParameter("look at z", MCCommandParameterType.coordinate)

	//tp <destination : Selector> facing [look at | selector] [check for blocks]
	add([TpCommand, TpDestination, TpFacing, TPLookAtEntity, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <destination : Selector> facing [look at X Y Z] [check for blocks]
	add([TpCommand, TpDestination, TpFacing, TPLookAtX, TPLookAtY, TPLookAtZ, TpCheckBlocks], "tp", "Teleport Entities");

	//tp <victim : Selector> <destination : Selector> facing [look at | selector] [check for blocks]
	add([TpCommand, TpVictim, TpDestination, TpFacing, TPLookAtEntity, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <victim : Selector> <destination : Selector> facing [look at X Y Z] [check for blocks]
	add([TpCommand, TpVictim, TpDestination, TpFacing, TPLookAtX, TPLookAtY, TPLookAtZ, TpCheckBlocks], "tp", "Teleport Entities");

	//tp <destination : x y z> facing [look at | selector] [check for blocks]
	add([TpCommand, destinationXR, destinationYR, destinationZR, TpFacing, TPLookAtEntity, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <destination : x y z> facing [look at X Y Z] [check for blocks]
	add([TpCommand, destinationXR, destinationYR, destinationZR, TpFacing, TPLookAtX, TPLookAtY, TPLookAtZ, TpCheckBlocks], "tp", "Teleport Entities");

	//tp <victim : Selector> <destination : x y z> facing [look at | selector] [check for blocks]
	add([TpCommand, TpVictim, destinationXR, destinationYR, destinationZR, TpFacing, TPLookAtEntity, TpCheckBlocks], "tp", "Teleport Entities");
	//tp <victim : Selector> <destination : x y z> facing [look at X Y Z] [check for blocks]
	add([TpCommand, TpVictim, destinationXR, destinationYR, destinationZR, TpFacing, TPLookAtX, TPLookAtY, TPLookAtZ, TpCheckBlocks], "tp", "Teleport Entities");

	//w Sends a private message to one or more players
	add([new MCCommandParameter("w"), new MCCommandParameter("selector", MCCommandParameterType.selector), new MCCommandParameter("message")], "w", "TODO description");

	//weather <keyword> [duration]
	const WeatherCommand = new MCCommandParameter("weather");
	const DurationOptional = new MCCommandParameter("duration", MCCommandParameterType.keyword, false);
	add([WeatherCommand, new MCCommandParameter("clear"), DurationOptional], "weather", "Sets the weather");
	add([WeatherCommand, new MCCommandParameter("rain"), DurationOptional], "weather", "Sets the weather");
	add([WeatherCommand, new MCCommandParameter("thunder"), DurationOptional], "weather", "Sets the weather");

	//xp <amount | xp> [player]
	const XPCommand = new MCCommandParameter("xp");
	add([XPCommand, new MCCommandParameter("amount", MCCommandParameterType.xp), selectorPlayerOptional], "xp", "Adds or removes player experience");
	add([XPCommand, new MCCommandParameter("amount", MCCommandParameterType.integer), selectorPlayerOptional], "xp", "Adds or removes player experience");
}

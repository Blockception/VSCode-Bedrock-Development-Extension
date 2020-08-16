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
import { AddCommand } from './ToCommand';
import { Manager } from '../../Manager';

export function AddCommands() : void {
	AddCommand("alwaysday [lock:boolean]");

	AddCommand("clear [player:selector] [itemName:item] [data:int] [maxCount:int]");
		
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate>");
	
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> replace");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> replace normal");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> replace force");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> replace move");

	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> masked");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> masked normal");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> masked force");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> masked move");
	
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> filtered normal <tileName:block> [tileData:int]");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> filtered force <tileName:block> [tileData:int]");
	AddCommand("clone <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> filtered move <tileName:block> [tileData:int]");
	
	AddCommand("deop <player:selector>");

	AddCommand("difficulty peaceful");
	AddCommand("difficulty easy");
	AddCommand("difficulty normal");
	AddCommand("difficulty hard");
	AddCommand("difficulty 0");
	AddCommand("difficulty 1");
	AddCommand("difficulty 2");
	AddCommand("difficulty 3");

	AddCommand("effect <player:selector> <effect:effect> [seconds:int] [amplifier:int] [boolean]");
	AddCommand("effect <player:selector> clear");

	AddCommand("enchant <player:selector> <id:int> [level:int]");
	AddCommand("enchant <player:selector> <id:enchant> [level:int]");

	AddCommand("execute <origin:selector> <position x:coordinate> <position y:coordinate> <position z:coordinate> <command:command>");
	AddCommand("execute <origin:selector> <position x:coordinate> <position y:coordinate> <position z:coordinate> detect <detectPos x:coordinate> <detectPos y:coordinate> <detectPos z:coordinate> <block:block> <data:int> <command:command>");
	
	AddCommand("fill <from x:coordinate> <from y:coordinate> <from z:coordinate> <to x:coordinate> <to y:coordinate> <to z:coordinate> <tileName:block> <tileData:int> replace [replaceTileName:block] [replaceDataValue:int]");
	AddCommand("fill <from x:coordinate> <from y:coordinate> <from z:coordinate> <to x:coordinate> <to y:coordinate> <to z:coordinate> <tileName:block> [tileData:int] outline");
	AddCommand("fill <from x:coordinate> <from y:coordinate> <from z:coordinate> <to x:coordinate> <to y:coordinate> <to z:coordinate> <tileName:block> [tileData:int] hollow");
	AddCommand("fill <from x:coordinate> <from y:coordinate> <from z:coordinate> <to x:coordinate> <to y:coordinate> <to z:coordinate> <tileName:block> [tileData:int] destroy");
	AddCommand("fill <from x:coordinate> <from y:coordinate> <from z:coordinate> <to x:coordinate> <to y:coordinate> <to z:coordinate> <tileName:block> [tileData:int] keep");

	AddCommand("function <function:function>");

	AddCommand("gamemode 0 [player:selector]");
	AddCommand("gamemode 1 [player:selector]");
	AddCommand("gamemode 2 [player:selector]");
	AddCommand("gamemode s [player:selector]");
	AddCommand("gamemode c [player:selector]");
	AddCommand("gamemode a [player:selector]");

	AddCommand("gamerule commandblockOutput [boolean]");
	AddCommand("gamerule commandblocksEnabled [boolean]");
	AddCommand("gamerule doDaylightCycle [boolean]");
	AddCommand("gamerule doEntityDrops [boolean]");
	AddCommand("gamerule doFireTick [boolean]");
	AddCommand("gamerule doInsomnia [boolean]");
	AddCommand("gamerule doMobLoot [boolean]");
	AddCommand("gamerule doMobSpawning [boolean]");
	AddCommand("gamerule doTileDrops [boolean]");
	AddCommand("gamerule doWeatherCycle [boolean]");
	AddCommand("gamerule drowningdamage [boolean]");
	AddCommand("gamerule falldamage [boolean]");
	AddCommand("gamerule firedamage [boolean]");
	AddCommand("gamerule keepInventory [boolean]");
	AddCommand("gamerule maxCommandChainLength [int]");
	AddCommand("gamerule mobGriefing [boolean]");
	AddCommand("gamerule naturalRegeneration [boolean]");
	AddCommand("gamerule pvp [boolean]");
	AddCommand("gamerule randomTickSpeed [boolean]");
	AddCommand("gamerule sendCommandFeedback [boolean]");
	AddCommand("gamerule showDeathMessages [boolean]");
	AddCommand("gamerule showcoordinates [boolean]");
	AddCommand("gamerule tntexplodes [boolean]");

	AddCommand("give <player:selector> <itemName:item> [amount:int] [data:int] [components:jsonitem]");
	AddCommand("kill [selector:selector]");

	AddCommand("locate buriedtreasure");
	AddCommand("locate endcity");
	AddCommand("locate fortress");
	AddCommand("locate mansion");
	AddCommand("locate mineshaft");
	AddCommand("locate monument");
	AddCommand("locate pillageroutpost");
	AddCommand("locate ruins");
	AddCommand("locate shipwreck");
	AddCommand("locate stronghold");
	AddCommand("locate temple");
	AddCommand("locate village");

	AddCommand("me <message:message>");

	AddCommand("msg <selector:selector> <message:message>");

	AddCommand("op <player:selector>");

	AddCommand("particle <effect:string> <position x:coordinate> <position y:coordinate> <position z:coordinate>");

	AddCommand("playsound <sound:string> [player:selector] [position x:coordinate] [position y:coordinate] [position z:coordinate] [volume:float] [pitch:float] [minimumVolume:float]");
	
	AddCommand("replaceitem block <position x:coordinate> <position y:coordinate> <position z:coordinate> slot.container <slotId:int> <itemName:item> [amount:int] [data:int] [components:json]");
	
	AddCommand("replaceitem entity <selector:selector> <slotType:EntityEquipmentSlot> <slotId:int> <itemName:item> [amount:int] [data:int] [components:json]");
	
	AddCommand("say <message:message>");
	
	AddCommand("scoreboard objectives add <name:string> dummy [display name:string]");
	AddCommand("scoreboard objectives list");
	AddCommand("scoreboard objectives remove <name:objective>");

	AddCommand("scoreboard objectives setdisplay list [objective:objective]");
	AddCommand("scoreboard objectives setdisplay sidebar [objective:objective]");
	AddCommand("scoreboard objectives setdisplay below_name [objective:objective]");

	AddCommand("scoreboard players add <entity:selector> <objective:objective> <count:int>");
	AddCommand("scoreboard players list [entity:selector]");

	AddCommand("scoreboard players operation <destination:selector> <destination:objective> <operation> <selector> <objective:objective>");
	
	AddCommand("scoreboard players random <entity:selector> <objective:objective> <min:int> <max:int>");
	AddCommand("scoreboard players remove <entity:selector> <objective:objective> <count:int>");
	AddCommand("scoreboard players reset <entity:selector> [objective:objective]");
	AddCommand("scoreboard players set <entity:selector> <objective:objective> <score:int>");
	AddCommand("scoreboard players test <entity:selector> <objective:objective> <min:int> <max:int>");

	AddCommand("setblock <position x:coordinate> <position y:coordinate> <position z:coordinate> <tileName:block> [tileData:int] [replace|destroy|keep]");
	AddCommand("setworldspawn [spawnPoint:x y z]");
	AddCommand("spawnpoint [player:selector] [spawnPos x:coordinate] [spawnPos y:coordinate] [spawnPos z:coordinate]");
	AddCommand("spreadplayers <x:value> <z:value> <spreadDistance:float> <maxRange:float> <victim:selector>");
	AddCommand("stopsound <player:selector> [sound:string]");

	AddCommand("summon <entityType:EntityType> [spawnPos x:coordinate] [spawnPos y:coordinate] [spawnPos z:coordinate] [spawnevent:event] [name:string]");
	AddCommand("summon <entityType:EntityType> [name:string] [spawnPos x:coordinate] [spawnPos y:coordinate] [spawnPos z:coordinate]");
	
	AddCommand("tag <selector:selector> add <name:tag>");
	AddCommand("tag <selector:selector> list");
	AddCommand("tag <selector:selector> remove <name:tag>");

	AddCommand("tell <selector:selector> <message:message>");
	AddCommand("tellraw <player> <json:jsonRawText>");
	AddCommand("testfor <victim:selector>");
	AddCommand("testforblock <position x:coordinate> <position y:coordinate> <position z:coordinate> <tileName:block> [dataValue:int]");
	AddCommand("testforblocks <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> ");
	AddCommand("testforblocks <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> all");
	AddCommand("testforblocks <begin x:coordinate> <begin y:coordinate> <begin z:coordinate> <end x:coordinate> <end y:coordinate> <end z:coordinate> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> masked");
	
	AddCommand("tickingarea add <from x:coordinate> <from y:coordinate> <from z:coordinate> <to x:coordinate> <to y:coordinate> <to z:coordinate> [name:string]");
	AddCommand("tickingarea add circle <center x:coordinate> <center y:coordinate> <center z:coordinate> <radius:int> [name:string]");
	AddCommand("tickingarea list [all-dimensions]");
	AddCommand("tickingarea remove <position:x y z|name:string>");
	AddCommand("tickingarea remove_all");

	AddCommand("time add <amount:int>");

	AddCommand("time query daytime");
	AddCommand("time query gametime");
	AddCommand("time query day");

	AddCommand("time set <amount:int>");

	AddCommand("title <player:selector> title <titleText:message>");
	AddCommand("title <player:selector> subtitle <titleText:message>");
	AddCommand("title <player:selector> actionbar> <titleText:message>");


	AddCommand("title <player:selector> clear");
	AddCommand("title <player:selector> reset");
	AddCommand("title <player:selector> times <fadeIn:int> <stay:int> <fadeOut:int>");

	AddCommand("tp <destination:selector> [yRot:coordinate] [xRot:coordinate]");
	AddCommand("tp <destination:selector> facing <lookAtEntity:selector>");

	AddCommand("tp <x:coordinate> <y:coordinate> <z:coordinate> [yRot:coordinate] [xRot:coordinate]");
	AddCommand("tp <victim:selector> <destination x:coordinate> <destination y:coordinate> <destination z:coordinate> [yRot:coordinate] [xRot:coordinate]");	

	AddCommand("tp <victim:selector> <destination:selector> facing <lookAtEntity:selector>");
	AddCommand("tp <victim:selector> <x:coordinate> <y:coordinate> <z:coordinate> facing <lookAtEntity:selector>");
	AddCommand("tp <victim:selector> <destination:selector> facing <lookAt x:coordinate> <lookAt y:coordinate> <lookAt z:coordinate>");
	AddCommand("tp <victim:selector> <x:coordinate> <y:coordinate> <z:coordinate> facing <lookAt x:coordinate> <lookAt y:coordinate> <lookAt z:coordinate>");

	AddCommand("w <selector:selector> <message:message>");

	AddCommand("weather clear [duration:int]");
	AddCommand("weather rain [duration:int]");
	AddCommand("weather thunder [duration:int]");

	AddCommand("xp <amount:xp> [player:selector]");

	console.log(JSON.stringify(Manager.Commands));
}


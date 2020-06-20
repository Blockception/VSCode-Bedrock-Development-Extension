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
import { SignatureHelp, ParameterInformation, SignatureInformation } from "vscode";
import { newItem } from "../Functions";

//No branching commands
export class GameruleSignatureProvider implements SignatureItemProvider {

   public All: SignatureInformation[];
   public commandblocksenabled: SignatureInformation;
   public commandblockoutput: SignatureInformation;
   public dodaylightcycle: SignatureInformation;
   public doentitydrops: SignatureInformation;
   public dofiretick: SignatureInformation;
   public doinsomnia: SignatureInformation;
   public immediaterespawn: SignatureInformation;
   public domobloot: SignatureInformation;
   public domobspawning: SignatureInformation;
   public dotiledrops: SignatureInformation;
   public doweathercycle: SignatureInformation;
   public drowningdamage: SignatureInformation;
   public falldamage: SignatureInformation;
   public firedamage: SignatureInformation;
   public keepinventory: SignatureInformation;
   public mobgriefing: SignatureInformation;
   public naturalregeneration: SignatureInformation;
   public pvp: SignatureInformation;
   public randomtickspeed: SignatureInformation;
   public sendcommandfeedback: SignatureInformation;
   public showcoordinates: SignatureInformation;
   public showdeathmessages: SignatureInformation;
   public spawnradius: SignatureInformation;
   public tntexplodes: SignatureInformation;
   public showtags: SignatureInformation;
   public maxcommandchainlength: SignatureInformation;

   constructor() {
      this.commandblocksenabled = newItem('gamerule commandblocksenabled [value: boolean]', 'Whether command blocks are enabled or not.', [
         new ParameterInformation('commandblocksenabled', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.commandblockoutput = newItem('gamerule commandblockoutput [value: boolean]', 'Whether command blocks should notify admins when they perform commands.', [
         new ParameterInformation('commandblockoutput', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.dodaylightcycle = newItem('gamerule dodaylightcycle [value: boolean]', 'Whether the day-night cycle and moon phases progress.', [
         new ParameterInformation('dodaylightcycle', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.doentitydrops = newItem('gamerule doentitydrops [value: boolean]', 'Whether entities that are not mobs should have drops.', [
         new ParameterInformation('doentitydrops', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.dofiretick = newItem('gamerule dofiretick [value: boolean]', 'Whether fire should spread and naturally extinguish.', [
         new ParameterInformation('dofiretick', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.doinsomnia = newItem('gamerule doinsomnia [value: boolean]', 'Whether phantoms can spawn in the nighttime.', [
         new ParameterInformation('doinsomnia', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.immediaterespawn = newItem('gamerule immediaterespawn [value: boolean]', 'Players respawn immediately without showing the death screen.', [
         new ParameterInformation('immediaterespawn', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.domobloot = newItem('gamerule domobloot [value: boolean]', 'Whether mobs should drop items.', [
         new ParameterInformation('<gamerule>', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.domobspawning = newItem('gamerule domobspawning [value: boolean]', 'Whether mobs should naturally spawn. Does not affect monster spawners.', [
         new ParameterInformation('domobspawning', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.dotiledrops = newItem('gamerule dotiledrops [value: boolean]', 'Whether blocks should have drops.', [
         new ParameterInformation('dotiledrops', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.doweathercycle = newItem('gamerule doweathercycle [value: boolean]', 'Whether the weather can change naturally. The /weather command can still change weather.', [
         new ParameterInformation('<gamerule>', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.drowningdamage = newItem('gamerule drowningdamage [value: boolean]', 'Whether the player should take damage when drowning.', [
         new ParameterInformation('<gamerule>', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.falldamage = newItem('gamerule falldamage [value: boolean]', 'Whether the player should take fall damage.', [
         new ParameterInformation('falldamage', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.firedamage = newItem('gamerule firedamage [value: boolean]', 'Whether the player should take fire damage.', [
         new ParameterInformation('firedamage', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.keepinventory = newItem('gamerule keepinventory [value: boolean]', 'Whether the player should keep items and experience in their inventory after death.', [
         new ParameterInformation('keepinventory', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.maxcommandchainlength = newItem('gamerule maxcommandchainlength [value: int]', 'Determines the number at which the chain command block acts as a "chain".', [
         new ParameterInformation('<gamerule>', ''),
         new ParameterInformation('[value: int]', '')
      ]);

      this.mobgriefing = newItem('gamerule mobgriefing [value: boolean]', 'Whether creepers, zombies, endermen, ghasts, withers, ender dragons, rabbits, sheep, villagers, silverfish, and snow golems should be able to change blocks and whether mobs can pick up items. This also affects the capability of zombie-like creatures like zombie pigmen and drowned to pathfind to turtle eggs. This will also prevent villagers from breeding.', [
         new ParameterInformation('mobgriefing', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.naturalregeneration = newItem('gamerule naturalregeneration [value: boolean]', 'Whether the player can regenerate health naturally if their hunger is full enough (doesn\'t affect external healing, such as golden apples, the Regeneration effect, etc.).', [
         new ParameterInformation('naturalregeneration', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.pvp = newItem('gamerule pvp [value: boolean]', 'Whether the player can fight with other players.', [
         new ParameterInformation('pvp', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.randomtickspeed = newItem('gamerule randomtickspeed [value: int]', 'How often a random block tick occurs (such as plant growth, leaf decay, etc.) per chunk section per game tick. 0 disables random ticks [needs testing], higher numbers increase random ticks. Setting to a high integer results in high speeds of decay and growth.', [
         new ParameterInformation('randomtickspeed', ''),
         new ParameterInformation('[value: int]', '')
      ]);

      this.sendcommandfeedback = newItem('gamerule sendcommandfeedback [value: boolean]', 'Whether the feedback from commands executed by a player should show up in chat. Also affects the default behavior of whether command blocks store their output text.', [
         new ParameterInformation('sendcommandfeedback', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.showcoordinates = newItem('gamerule showcoordinates [value: boolean]', 'Whether the player\'s coordinates are displayed.', [
         new ParameterInformation('showcoordinates', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.showdeathmessages = newItem('gamerule showdeathmessages [value: boolean]', 'Whether death messages are put into chat when a player dies. Also affects whether a message is sent to the pet\'s owner when the pet dies.', [
         new ParameterInformation('showdeathmessages', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.spawnradius = newItem('gamerule spawnradius [value: boolean]', 'The number of blocks outward from the world spawn coordinates that a player spawns in when first joining a server or when dying without a personal spawnpoint/.', [
         new ParameterInformation('spawnradius', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.tntexplodes = newItem('gamerule tntexplodes [value: boolean]', 'Whether TNT explodes after activation.', [
         new ParameterInformation('tntexplodes', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.showtags = newItem('gamerule showtags [value: boolean]', 'Hides the \"Can place on\" and \"Can destroy\" block lists from item lore.', [
         new ParameterInformation('showtags', ''),
         new ParameterInformation('[value: boolean]', '')
      ]);

      this.All = [
         this.commandblocksenabled,
         this.commandblockoutput,
         this.dodaylightcycle,
         this.doentitydrops,
         this.dofiretick,
         this.doinsomnia,
         this.immediaterespawn,
         this.domobloot,
         this.domobspawning,
         this.dotiledrops,
         this.doweathercycle,
         this.drowningdamage,
         this.falldamage,
         this.firedamage,
         this.keepinventory,
         this.mobgriefing,
         this.naturalregeneration,
         this.pvp,
         this.randomtickspeed,
         this.sendcommandfeedback,
         this.showcoordinates,
         this.showdeathmessages,
         this.spawnradius,
         this.tntexplodes,
         this.showtags,
         this.maxcommandchainlength
      ];
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp> {
      var RuleChild = Item.GetAt(1);

      var Count = Item.Count();

      if (RuleChild == undefined) {
         var Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = Count;
         return Out;
      }

      var Child = undefined;

      switch (RuleChild.Text.text) {
         case 'commandblocksenabled':
            Child = this.commandblocksenabled;
            break;

         case 'commandblockoutput':
            Child = this.commandblockoutput;
            break;

         case 'dodaylightcycle':
            Child = this.dodaylightcycle;
            break;

         case 'doentitydrops':
            Child = this.doentitydrops;
            break;

         case 'dofiretick':
            Child = this.dofiretick;
            break;

         case 'doinsomnia':
            Child = this.doinsomnia;
            break;

         case 'immediaterespawn':
            Child = this.immediaterespawn;
            break;

         case 'domobloot':
            Child = this.domobloot;
            break;

         case 'domobspawning':
            Child = this.domobspawning;
            break;

         case 'dotiledrops':
            Child = this.dotiledrops;
            break;

         case 'doweathercycle':
            Child = this.doweathercycle;
            break;

         case 'drowningdamage':
            Child = this.drowningdamage;
            break;

         case 'falldamage':
            Child = this.falldamage;
            break;

         case 'firedamage':
            Child = this.firedamage;
            break;

         case 'keepinventory':
            Child = this.keepinventory;
            break;

         case 'mobgriefing':
            Child = this.mobgriefing;
            break;

         case 'naturalregeneration':
            Child = this.naturalregeneration;
            break;

         case 'pvp':
            Child = this.pvp;
            break;

         case 'randomtickspeed':
            Child = this.randomtickspeed;
            break;

         case 'sendcommandfeedback':
            Child = this.sendcommandfeedback;
            break;

         case 'showcoordinates':
            Child = this.showcoordinates;
            break;

         case 'showdeathmessages':
            Child = this.showdeathmessages;
            break;

         case 'spawnradius':
            Child = this.spawnradius;
            break;

         case 'tntexplodes':
            Child = this.tntexplodes;
            break;

         case 'showtags':
            Child = this.showtags;
            break;

         case 'maxcommandchainlength':
            Child = this.maxcommandchainlength;
            break;
      }

      if (Child == undefined){
         var Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = Count;
         return Out;
      }

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      var Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

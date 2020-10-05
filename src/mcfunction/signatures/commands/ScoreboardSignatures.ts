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
export class ScoreboardSignatureProvider implements SignatureItemProvider {

   public All: SignatureInformation[];
   public Objectives: SignatureInformation[];
   public Objectives_Setdisplay_All: SignatureInformation[];
   public Players: SignatureInformation[];

   public Objective_List: SignatureInformation;
   public Objective_Add: SignatureInformation;
   public Objective_Remove: SignatureInformation;
   public Objective_Setdisplay: SignatureInformation;
   public Objective_Setdisplay_Belowname: SignatureInformation;
   public Objective_Setdisplay_List: SignatureInformation;
   public Objective_Setdisplay_Sidebar: SignatureInformation;

   public Players_List: SignatureInformation;
   public Players_Set: SignatureInformation;
   public Players_Add: SignatureInformation;
   public Players_Remove: SignatureInformation;
   public Players_Reset: SignatureInformation;
   public Players_Operation: SignatureInformation;
   public Players_Test: SignatureInformation;
   public Players_Random: SignatureInformation;

   constructor() {

      //Objectives
      this.Objective_List = newItem('scoreboard objectives list', 'Lists all created letiables in the scoreboard', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('list', '')
      ]);

      this.Objective_Add = newItem('scoreboard objectives add <name> dummy [display name: string]', 'Adds a new letiable to the scoreboard', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('add', ''),
         new ParameterInformation('<name>', ''),
         new ParameterInformation('dummy', ''),
         new ParameterInformation('[display name: string]', '')
      ]);

      this.Objective_Remove = newItem('scoreboard objectives remove <name>', 'Removes a letiable from the scoreboard', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('remove', ''),
         new ParameterInformation('<name>', '')
      ]);

      this.Objective_Setdisplay = newItem('scoreboard objectives setdisplay <slot> [objective] [ascending|descending]', 'Displays the given letiable onto the given slot', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('setdisplay', ''),
         new ParameterInformation('<slot>', ''),
         new ParameterInformation('[objective]', ''),
         new ParameterInformation('[ascending|descending]', '')
      ]);

      this.Objective_Setdisplay_Belowname = newItem('scoreboard objectives setdisplay belowname [objective]', 'Displays the given letiable under the name', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('setdisplay', ''),
         new ParameterInformation('belowname', ''),
         new ParameterInformation('[objective]', '')
      ]);

      this.Objective_Setdisplay_List = newItem('scoreboard objectives setdisplay list [objective] [ascending|descending]', 'Displays the given letiable in the players list', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('setdisplay', ''),
         new ParameterInformation('list', ''),
         new ParameterInformation('[objective]', ''),
         new ParameterInformation('[ascending|descending]', '')
      ]);

      this.Objective_Setdisplay_Sidebar = newItem('scoreboard objectives setdisplay sidebar [objective] [ascending|descending]', 'Displays the given letiable on the right side of the screen', [
         new ParameterInformation('objectives', ''),
         new ParameterInformation('setdisplay', ''),
         new ParameterInformation('sidebar', ''),
         new ParameterInformation('[objective]', ''),
         new ParameterInformation('[ascending|descending]', '')
      ]);

      this.Objectives = [
         this.Objective_List,
         this.Objective_Add,
         this.Objective_Remove,
         this.Objective_Setdisplay,
         this.Objective_Setdisplay_Belowname,
         this.Objective_Setdisplay_List,
         this.Objective_Setdisplay_Sidebar
      ]

      this.Objectives_Setdisplay_All = [
         this.Objective_Setdisplay,
         this.Objective_Setdisplay_Belowname,
         this.Objective_Setdisplay_List,
         this.Objective_Setdisplay_Sidebar
      ]

      //Players
      this.Players_List = newItem('scoreboard players list [entity]', 'Display players or the scores of an entity', [
         new ParameterInformation('players', ''),
         new ParameterInformation('list', ''),
         new ParameterInformation('[entity]', '')
      ]);

      this.Players_Set = newItem('scoreboard players set <entity: string> <objective> <score>', 'Sets the score of an given entity or playername', [
         new ParameterInformation('players', ''),
         new ParameterInformation('set', ''),
         new ParameterInformation('<entity: string>', ''),
         new ParameterInformation('<objective>', ''),
         new ParameterInformation('<score>', '')
      ]);

      this.Players_Add = newItem('scoreboard players add <entity: string> <objective> <count>', 'Add onto the score of an given entity or playername', [
         new ParameterInformation('players', ''),
         new ParameterInformation('add', ''),
         new ParameterInformation('<entity: string>', ''),
         new ParameterInformation('<objective>', ''),
         new ParameterInformation('<count>', '')
      ]);

      this.Players_Remove = newItem('scoreboard players remove <entity: string> <objective> <count>', 'Substracts the score of an given entity or playername', [
         new ParameterInformation('players', ''),
         new ParameterInformation('remove', ''),
         new ParameterInformation('<entity: string>', ''),
         new ParameterInformation('<objective>', ''),
         new ParameterInformation('<count>', '')
      ]);

      this.Players_Reset = newItem('scoreboard players reset <entity: string> [objective]', 'Resets the score(s) of an given entity or playername', [
         new ParameterInformation('players', ''),
         new ParameterInformation('reset', ''),
         new ParameterInformation('<entity: string>', ''),
         new ParameterInformation('[objective]', '')
      ]);

      this.Players_Operation = newItem('scoreboard players operation <targetName> <targetObjective> <operation> <selector> <objective>', 'Performs an operation on two or more score carriers', [
         new ParameterInformation('players', ''),
         new ParameterInformation('operation', ''),
         new ParameterInformation('<targetName>', ''),
         new ParameterInformation('<targetObjective>', ''),
         new ParameterInformation('<operation>', ''),
         new ParameterInformation('<selector>', ''),
         new ParameterInformation('<objective>', '')
      ]);

      this.Players_Test = newItem('scoreboard players test <entity> <objective> <min|*> <max|*>', 'A test statement to test an entity or playername has the specified value', [
         new ParameterInformation('players', ''),
         new ParameterInformation('test', ''),
         new ParameterInformation('<entity>', ''),
         new ParameterInformation('<objective>', ''),
         new ParameterInformation('<min|*>', ''),
         new ParameterInformation('<max|*>', '')
      ]);

      this.Players_Random = newItem('scoreboard players random <entity> <objective> <min> <max>', 'Assigns a random value to the specified entities or playername', [
         new ParameterInformation('players', ''),
         new ParameterInformation('random', ''),
         new ParameterInformation('<entity>', ''),
         new ParameterInformation('<objective>', ''),
         new ParameterInformation('<min|*>', ''),
         new ParameterInformation('<max|*>', '')
      ]);

      this.Players = [
         this.Players_List,
         this.Players_Set,
         this.Players_Add,
         this.Players_Remove,
         this.Players_Reset,
         this.Players_Operation,
         this.Players_Test,
         this.Players_Random
      ];

      //Create all
      this.All = [
         ...this.Objectives,
         ...this.Players
      ]
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let Mode = Item.Child;

      if (Mode == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = 0;
         return Out;
      }

      if (Mode.Text.text == 'objectives')
         return this.provideObjectives(Mode, Sm);

      if (Mode.Text.text == 'players')
         return this.providePlayers(Mode, Sm);

      return undefined;
   }

   provideObjectives(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let Mode = Item.Child;
      let Count = Item.Count();

      if (Mode == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = this.Objectives;
         Out.activeParameter = 0;
         return Out;
      }

      let Child = undefined;

      switch (Mode.Text.text) {
         case 'list':
            Child = this.Objective_List;
            break;

         case 'add':
            Child = this.Objective_Add;
            break;

         case 'remove':
            Child = this.Objective_Remove;
            break;

         case 'setdisplay':
            return this.provideObjectivesSetDisplay(Mode, Sm);
      }

      if (Child == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = Count;
         return Out;
      }

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }

   provideObjectivesSetDisplay(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let Mode = Item.Child;
      let Count = Item.Count();

      if (Mode == undefined){
         let Out = new SignatureHelp();
         Out.signatures = this.Objectives_Setdisplay_All;
         Out.activeParameter = 0;
         return Out;
      }

      let Child = undefined;

      switch (Mode.Text.text) {
         case 'belowname':
            Child = this.Objective_Setdisplay_Belowname;
            break;

         case 'list':
            Child = this.Objective_Setdisplay_List;
            break;

         case 'sidebar':
            Child = this.Objective_Setdisplay_Sidebar;
            break;
      }
      
      if (Child == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = Count;
         return Out;
      }

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }

   providePlayers(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let Mode = Item.Child;
      let Count = Item.Count();

      if (Mode == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = this.Players;
         Out.activeParameter = 0;
         return Out;
      }

      let Child = undefined;

      switch (Mode.Text.text) {
         case 'list':
            Child = this.Players_List;
            break;

         case 'set':
            Child = this.Players_Set;
            break;

         case 'add':
            Child = this.Players_Add;
            break;

         case 'remove':
            Child = this.Players_Remove;
            break;

         case 'reset':
            Child = this.Players_Reset;
            break;

         case 'operation':
            Child = this.Players_Operation;
            break;

         case 'test':
            Child = this.Players_Test;
            break;

         case 'random':
            Child = this.Players_Random;
            break;
      }

      if (Child == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = Count;
         return Out;
      }

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

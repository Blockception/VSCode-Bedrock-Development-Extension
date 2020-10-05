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
export class MobeventSignatureProvider implements SignatureItemProvider {

   public All: SignatureInformation[];

   public pillager_patrols_event: SignatureInformation;
   public wandering_trader_event: SignatureInformation;
   public events_enabled: SignatureInformation;

   constructor() {
      this.pillager_patrols_event = newItem('mobevent minecraft:pillager_patrols_event [value: Boolean]', 'for the event that generates an illager patrol.', [
         new ParameterInformation('minecraft:pillager_patrols_event', ''),
         new ParameterInformation('[value: Boolean]', '')
      ]);
      this.wandering_trader_event = newItem('mobevent minecraft:wandering_trader_event [value: Boolean]', ' for the event that spawns a wandering trader', [
         new ParameterInformation('minecraft:wandering_trader_event', ''),
         new ParameterInformation('[value: Boolean]', '')
      ]);
      this.events_enabled = newItem('mobevent events_enabled [value: Boolean]', 'for the event subsystem. When this is disabled, no events occur; when enabled, only enabled events occur.', [
         new ParameterInformation('events_enabled', ''),
         new ParameterInformation('[value: Boolean]', '')
      ]);

      this.All = [
         this.pillager_patrols_event,
         this.events_enabled,
         this.wandering_trader_event
      ];
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp> {
      let Count = Item.Count();

      if (Count > 2) {
         return undefined;
      }

      let Event = Item.Child;

      if (Event == undefined){
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = Count;
         return Out;
      }

      let Child = undefined;

      switch(Event.Text.text){
         case 'minecraft:pillager_patrols_event':
            Child = this.pillager_patrols_event;
            break;

         case 'minecraft:wandering_trader_event':
            Child = this.wandering_trader_event;
            break;

         case 'events_enabled':
            Child = this.events_enabled;
            break;
      }

      
      if (Child == undefined){
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

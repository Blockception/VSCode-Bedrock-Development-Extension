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
export class ReplaceItemSignatureProvider implements SignatureItemProvider {

   public Entity: SignatureInformation;
   public Block: SignatureInformation;

   constructor() {
      this.Block = newItem('replaceitem block <position: x> <position: y> <position: z> slot.container <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]', 'Replaces items in inventories', [
         new ParameterInformation('block', ''),
         new ParameterInformation('<position: x>', ''),
         new ParameterInformation('<position: y>', ''),
         new ParameterInformation('<position: z>', ''),
         new ParameterInformation('slot.container', ''),
         new ParameterInformation('<slotId: int>', ''),
         new ParameterInformation('<itemName: Item>', ''),
         new ParameterInformation('[amount: int]', ''),
         new ParameterInformation('[data: int]', ''),
         new ParameterInformation('[components: json]', '')
         ]);         
      this.Entity = newItem('replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]', 'Replaces items in inventories', [
         new ParameterInformation('entity', ''),
         new ParameterInformation('<target: target>', ''),
         new ParameterInformation('<slotType: EntityEquipmentSlot>', ''),
         new ParameterInformation('<slotId: int>', ''),
         new ParameterInformation('<itemName: Item>', ''),
         new ParameterInformation('[amount: int]', ''),
         new ParameterInformation('[data: int]', ''),
         new ParameterInformation('[components: json]', '')
         ]);
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let TargetType = Item.Child;

      let Count = Item.Count();

      if (TargetType == undefined){
         let Out = new SignatureHelp();
         Out.signatures = [this.Entity, this.Block];
         Out.activeParameter = Count;
         return Out;
      }

      let Child;

      if (TargetType.Text.text == 'entity'){
         Child = this.Entity; 
      }
      else
         Child = this.Block;

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

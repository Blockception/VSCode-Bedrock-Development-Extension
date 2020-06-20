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
export class TickingareaSignatureProvider implements SignatureItemProvider {

   public All: SignatureInformation[];

   public List: SignatureInformation;
   public Remove_All: SignatureInformation;
   public Remove: SignatureInformation;
   public Add_Circle: SignatureInformation;
   public Add: SignatureInformation;

   constructor() {
      this.List = newItem('tickingarea list [all-dimensions]', 'List ticking areas.', [
         new ParameterInformation('list', ''),
         new ParameterInformation('[all-dimensions]', '')
      ]);

      this.Remove_All = newItem('tickingarea remove_all', 'remove all ticking areas.', [
         new ParameterInformation('remove_all', '')
      ]);

      this.Remove = newItem('tickingarea remove <position: x y z|name: string>', 'remove ticking areas.', [
         new ParameterInformation('remove', ''),
         new ParameterInformation('<position: x y z|name: string>', '')
      ]);

      this.Add_Circle = newItem('tickingarea add circle <center: x> <center: y> <center: z> <radius: int> [name: string]', 'Add ticking areas.', [
         new ParameterInformation('add', ''),
         new ParameterInformation('circle', ''),
         new ParameterInformation('<center: x>', ''),
         new ParameterInformation('<center: y>', ''),
         new ParameterInformation('<center: z>', ''),
         new ParameterInformation('<radius: int>', ''),
         new ParameterInformation('[name: string]', '')
      ]);

      this.Add = newItem('tickingarea add <from: x> <from: y> <from: z> <to: x> <to: y> <to: z> [name: string]', 'Add ticking areas.', [
         new ParameterInformation('add', ''),
         new ParameterInformation('<from: x>', ''),
         new ParameterInformation('<from: y>', ''),
         new ParameterInformation('<from: z>', ''),
         new ParameterInformation('<to: x>', ''),
         new ParameterInformation('<to: y>', ''),
         new ParameterInformation('<to: z>', ''),
         new ParameterInformation('[name: string]', '')
      ]);

      this.All = [
         this.Add,
         this.Add_Circle,
         this.List,
         this.Remove,
         this.Remove_All
      ]
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp> {

      var Mode = Item.Child;

      if (Mode == undefined) {
         var Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = 0;
         return Out;
      }

      var Child = undefined;

      switch (Mode.Text.text) {
         case 'add':
            var Circle = Mode.Child;

            if (Circle == undefined) {
               var Out = new SignatureHelp();
               Out.signatures = [this.Add, this.Add_Circle];
               Out.activeParameter = 1;
               return Out;
            }

            if (Circle.Text.text == 'circle') {
               Child = this.Add_Circle;
            } else {
               Child = this.Add;
            }

            break;

         case 'list':
            Child = this.List;
            break;

         case 'remove':
            Child = this.Remove;
            break;

         case 'remove_all':
            Child = this.Remove_All;
            break;
      }

      var Count = Item.Count();

      if (Child == undefined) {
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

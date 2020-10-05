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
export class TagSignatureProvider implements SignatureItemProvider {

   public All: SignatureInformation[];

   public Remove: SignatureInformation;
   public Add: SignatureInformation;
   public List: SignatureInformation;

   constructor() {
      this.Remove = newItem('tag <targets> remove <name: Tag>', 'Remove tags stored in entities', [
         new ParameterInformation('<targets>', ''),
         new ParameterInformation('remove', ''),
         new ParameterInformation('<name: Tag>', '')
      ]);

      this.List = newItem('tag <targets> list', 'Lists tags stored in entities', [
         new ParameterInformation('<targets>', ''),
         new ParameterInformation('list', '')
      ]);

      this.Add = newItem('tag <targets> add <name: Tag>', 'Adds tags stored in entities', [
         new ParameterInformation('<targets>', ''),
         new ParameterInformation('add', ''),
         new ParameterInformation('<name: Tag>', '')
      ]);

      this.All = [
         this.Add,
         this.Remove,
         this.List
      ]
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp> {
      let TargetChild = Item.Child;

      if (TargetChild == undefined){
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = 0;
         return Out;
      }

      let Mode = TargetChild.Child;

      if (Mode == undefined){
         let Out = new SignatureHelp();
         Out.signatures = this.All;
         Out.activeParameter = 0;
         return Out;
      }

      let Child = undefined;

      switch(Mode.Text.text){
         case 'add':
            Child = this.Add;
            break;

         case 'remove':
            Child = this.Remove;
            break;

         case 'list':
            Child = this.List;
            break;
      }

      
      let Count = Item.Count();

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

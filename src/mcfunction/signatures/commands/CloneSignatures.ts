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
export class CloneSignatureProvider implements SignatureItemProvider {

   public Filtered: SignatureInformation;
   public Other: SignatureInformation;

   constructor() {
      this.Other = newItem('clone <begin: x> <begin: y> <begin: z> <end: x> <end: y> <end: z> <destination: x> <destination: y> <destination: z> [replace|masked] [normal|force|move]', 'Clones blocks from one region to another.', [
         new ParameterInformation('<begin: x>', ''),
         new ParameterInformation('<begin: y>', ''),
         new ParameterInformation('<begin: z>', ''),
         new ParameterInformation('<end: x>', ''),
         new ParameterInformation('<end: y>', ''),
         new ParameterInformation('<end: z>', ''),
         new ParameterInformation('<destination: x>', ''),
         new ParameterInformation('<destination: y>', ''),
         new ParameterInformation('<destination: z>', ''),
         new ParameterInformation('[replace|masked]', ''),
         new ParameterInformation('[normal|force|move]', '')
      ]);
      this.Filtered = newItem('clone <begin: x> <begin: y> <begin: z> <end: x> <end: y> <end: z> <destination: x> <destination: y> <destination: z> filtered <normal|force|move> <tileName: Block> <tileData: int>', 'Clones blocks from one region to another.', [
         new ParameterInformation('<begin: x>', ''),
         new ParameterInformation('<begin: y>', ''),
         new ParameterInformation('<begin: z>', ''),
         new ParameterInformation('<end: x>', ''),
         new ParameterInformation('<end: y>', ''),
         new ParameterInformation('<end: z>', ''),
         new ParameterInformation('<destination: x>', ''),
         new ParameterInformation('<destination: y>', ''),
         new ParameterInformation('<destination: z>', ''),
         new ParameterInformation('filtered', ''),
         new ParameterInformation('<normal|force|move>', ''),
         new ParameterInformation('<tileName: Block>', ''),
         new ParameterInformation('<tileData: int>', '')
        
      ]);
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager) : SignatureHelp | undefined {
      let FilteredChild = Item.GetAt(10);

      let Count = Item.Count();

      if (FilteredChild == undefined){
         let Out = new SignatureHelp();
         Out.signatures = [this.Other, this.Filtered];
         Out.activeParameter = Count;
         return Out;
      }

      let Child;

      if (FilteredChild.Text.text == 'filtered'){
         Child = this.Filtered; 
      }
      else
         Child = this.Other;

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

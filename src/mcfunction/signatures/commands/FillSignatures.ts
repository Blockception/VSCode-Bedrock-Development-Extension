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
export class FillSignatureProvider implements SignatureItemProvider {

   public Replace: SignatureInformation;
   public Normal: SignatureInformation;

   constructor() {
      this.Normal = newItem('fill <from: x> <from: y> <from: z> <to: x> <to: y> <to: z> <tileName: Block> [tileData: int] [outline|hollow|destroy|keep]', 'Fills all or parts of a region with a specific block.', [
         new ParameterInformation('<from: x>', ''),
         new ParameterInformation('<from: y>', ''),
         new ParameterInformation('<from: z>', ''),
         new ParameterInformation('<to: x>', ''),
         new ParameterInformation('<to: y>', ''),
         new ParameterInformation('<to: z>', ''),
         new ParameterInformation('<tileName: Block>', ''),
         new ParameterInformation('[tileData: int]', ''),
         new ParameterInformation('[outline|hollow|destroy|keep]', '')
      ]);
      this.Replace = newItem('fill <from: x> <from: y> <from: z> <to: x> <to: y> <to: z> <tileName: Block> <tileData: int> replace [replaceTileName: Block] [replaceDataValue: int]', 'Fills all or parts of a region with a specific block.', [
         new ParameterInformation('<from: x>', ''),
         new ParameterInformation('<from: y>', ''),
         new ParameterInformation('<from: z>', ''),
         new ParameterInformation('<to: x>', ''),
         new ParameterInformation('<to: y>', ''),
         new ParameterInformation('<to: z>', ''),
         new ParameterInformation('<tileName: Block>', ''),
         new ParameterInformation('<tileData: int>', ''),
         new ParameterInformation('replace', ''),
         new ParameterInformation('[replaceTileName: Block]', ''),
         new ParameterInformation('[replaceDataValue: int]', '')
      ]);
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let ReplaceChild = Item.GetAt(8);

      let Count = Item.Count();

      if (ReplaceChild == undefined){
         let Out = new SignatureHelp();
         Out.signatures = [this.Normal, this.Replace];
         Out.activeParameter = Count;
         return Out;
      }

      let Child;

      if (ReplaceChild.Text.text == 'replace'){
         Child = this.Replace; 
      }
      else
         Child = this.Normal;

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

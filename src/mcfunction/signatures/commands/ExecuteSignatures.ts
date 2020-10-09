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
export class ExecuteSignatureProvider implements SignatureItemProvider {

   public Normal: SignatureInformation;
   public Detect: SignatureInformation;

   constructor() {
      this.Normal = newItem('execute <origin: target> <position: x> <position: y> <position: z> <command: command>', 'Executes a command on behalf of one or more entities.', [
         new ParameterInformation('<origin: target>', ''),
         new ParameterInformation('<position: x>', ''),
         new ParameterInformation('<position: y>', ''),
         new ParameterInformation('<position: z>', ''),
         new ParameterInformation('<command: command>', '')
      ]);
      this.Detect = newItem('execute <origin: target> <position: x> <position: y> <position: z> detect <detectPos: x> <detectPos: y> <detectPos: z> <block: Block> <data: int> <command: command>', 'Executes a command on behalf of one or more entities.', [
         new ParameterInformation('<origin: target>', ''),
         new ParameterInformation('<position: x>', ''),
         new ParameterInformation('<position: y>', ''),
         new ParameterInformation('<position: z>', ''),
         new ParameterInformation('detect', ''),
         new ParameterInformation('<detectPos: x>', ''),
         new ParameterInformation('<detectPos: y>', ''),
         new ParameterInformation('<detectPos: z>', ''),
         new ParameterInformation('<block: Block>', ''),
         new ParameterInformation('<data: int>', ''),
         new ParameterInformation('<command: command>', '')
      ]);
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): SignatureHelp | undefined {
      let DetectChild = Item.GetAt(5);

      let Count = Item.Count();

      if (DetectChild == undefined) {
         let Out = new SignatureHelp();
         Out.signatures = [this.Normal, this.Detect];
         Out.activeParameter = Count;
         return Out;
      }

      let Child;
      let Detect = DetectChild.Text.text == 'detect';

      if (Detect) {
         Child = this.Detect;
      }
      else
         Child = this.Normal;

      //Too many childern
      if (Count >= Child.parameters.length - 1){
         let Command;

         if (Detect){
            Command = Item.GetAt(11);
         }
         else
            Command = Item.GetAt(5);

         if (Command == undefined){
            return undefined;
         }

         let Next = Sm.SignatureProviders.get(Command.Text.text);

         if (Next == undefined){
            return undefined;
         }

         return Next.provideSignature(Command, Sm);
      }

      Child.activeParameter = Count;

      let Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

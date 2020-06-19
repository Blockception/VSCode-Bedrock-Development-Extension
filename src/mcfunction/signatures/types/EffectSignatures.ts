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
export class EffectSignatureProvider implements SignatureItemProvider {

   public Give: SignatureInformation;
   public Clear: SignatureInformation;

   constructor() {
      this.Give = newItem('effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]', 'Add status effects.', [
         new ParameterInformation('<player: target>', ''),
         new ParameterInformation('<effect: Effect>', ''),
         new ParameterInformation('[seconds: int]', ''),
         new ParameterInformation('[amplifier: int]', ''),
         new ParameterInformation('[hideParticles: Boolean]', '')
      ]);
      this.Clear = newItem('effect <player: target> clear', 'Remove status effects.', [
         new ParameterInformation('<player: target>', ''),
         new ParameterInformation('clear', '')
      ]);
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp> {
      var ClearChild = Item.GetAt(2);

      var Count = Item.Count();

      if (ClearChild == undefined){
         var Out = new SignatureHelp();
         Out.signatures = [this.Give, this.Clear];
         Out.activeParameter = Count;
         return Out;
      }

      var Child;

      if (ClearChild.Text.text == 'clear'){
         Child = this.Clear; 
      }
      else
         Child = this.Give;

      if (Count > Child.parameters.length)
         return undefined;

      Child.activeParameter = Count;

      var Out = new SignatureHelp();
      Out.signatures = [Child];
      Out.activeParameter = Count;

      return Out;
   }
}

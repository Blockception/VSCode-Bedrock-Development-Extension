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
export class TpSignatureProvider implements SignatureItemProvider {

   public All: SignatureInformation[];

   constructor() {
      this.All = [
         newItem('tp <target: target> <destination: target> [yRot: value] [xRot: value] [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<destination: target>', ''),
            new ParameterInformation('[yRot: value]', ''),
            new ParameterInformation('[xRot: value]', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),
         newItem('tp <target: target> <destination: x> <destination: y> <destination: z> [yRot: value] [xRot: value] [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('[yRot: value]', ''),
            new ParameterInformation('[xRot: value]', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),

         newItem('tp <target: target> <destination: target> facing <lookAtEntity: target> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<destination: target>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<lookAtEntity: target>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),
         newItem('tp <target: target> <destination: target> facing <position: x> <position: y> <position: z> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<destination: target>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),

         newItem('tp <target: target> <destination: x> <destination: y> <destination: z> facing <lookAtEntity: target> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<lookAtEntity: target>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),
         newItem('tp <target: target> <destination: x> <destination: y> <destination: z> facing <position: x> <position: y> <position: z> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<target: target>', ''),
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),

         newItem('tp <destination: target> [yRot: value] [xRot: value] [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<destination: target>', ''),
            new ParameterInformation('[yRot: value]', ''),
            new ParameterInformation('[xRot: value]', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),
         newItem('tp <destination: x> <destination: y> <destination: z> [yRot: value] [xRot: value] [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('[yRot: value]', ''),
            new ParameterInformation('[xRot: value]', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),

         newItem('tp <destination: target> facing <lookAtEntity: target> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<destination: target>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<lookAtEntity: target>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),
         newItem('tp <destination: x> <destination: y> <destination: z> facing <lookAtEntity: target> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<lookAtEntity: target>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),

         newItem('tp <destination: target> facing <position: x> <position: y> <position: z> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<destination: target>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ]),
         newItem('tp <destination: x> <destination: y> <destination: z> facing <position: x> <position: y> <position: z> [checkForBlocks: Boolean]', 'Teleports entities', [
            new ParameterInformation('<destination: x>', ''),
            new ParameterInformation('<destination: y>', ''),
            new ParameterInformation('<destination: z>', ''),
            new ParameterInformation('facing', ''),
            new ParameterInformation('<position: x>', ''),
            new ParameterInformation('<position: y>', ''),
            new ParameterInformation('<position: z>', ''),
            new ParameterInformation('[checkForBlocks: Boolean]', '')
         ])
      ];
   }

   provideSignature(Item: SyntaxItem, Sm: SignatureManager): vscode.ProviderResult<SignatureHelp> {
      let Out = new SignatureHelp();
      Out.signatures = this.All;
      Out.activeParameter = Item.Count();
      return Out;
   }
}

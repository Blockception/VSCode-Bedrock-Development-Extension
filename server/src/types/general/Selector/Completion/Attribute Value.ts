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
import { CompletionList, CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../../completion/Builder";
import { provideEntityTestCompletion } from "../../Entity/Completion";
import { provideFamilyTestCompletion } from "../../Family/Completion";
import { provideFloatCompletion } from "../../Float/Completion";
import { provideGamemodeTestCompletion } from "../../Gamemode/Completion";
import { provideIntegerCompletion } from "../../Integer/Completion";
import { provideTagTestCompletion } from "../../Tag/include";

//Doesnt do scores and doesnt need to
export function provideSelectorAttributeValueCompletion(receiver: CompletionBuilder, attribute: string, forEntities: boolean, type: string | undefined = undefined): void {
  switch (attribute) {
    case "c":
      receiver.Add("1", "Limits the amount of target to 1", CompletionItemKind.Constant);
      receiver.Add("-1", "Limits the amount of target to 1, but picked from the end of the list", CompletionItemKind.Constant);
      receiver.Add("5", "Limits the amount of target to 5", CompletionItemKind.Constant);
      receiver.Add("-5", "Limits the amount of target to 5, but picked from the end of the list", CompletionItemKind.Constant);
      return;

    case "dx":
    case "dy":
    case "dz":
      receiver.Add("5", "A length of 5", CompletionItemKind.Constant);
      receiver.Add("-5", "A length of 5, in the other direction", CompletionItemKind.Constant);
      return;

    case "family":
      provideFamilyTestCompletion(receiver, type);
      return;

    case "r":
    case "rm":
    case "lm":
    case "l":
      provideIntegerCompletion(receiver, { minimum: 0, maximum: 100 });
      return;

    case "m":
      provideGamemodeTestCompletion(receiver);
      return;

    case "name":
      receiver.Add('""', "The start of a string name", CompletionItemKind.Constant);
      return;

    case "rx":
    case "rxm":
    case "ry":
    case "rym":
      provideFloatCompletion(receiver, { minimum: -180, maximum: 180 });
      return;

    case "tag":
      provideTagTestCompletion(receiver);
      return;

    case "type":
      if (forEntities) {
        provideEntityTestCompletion(receiver);
      }
      return;

    case "x":
    case "y":
    case "z":
      receiver.Add("1", "An absolute coordinate", CompletionItemKind.Constant);
      receiver.Add("~1", "A relative coordinate", CompletionItemKind.Constant);
      receiver.Add("~-1", "A relative coordinate", CompletionItemKind.Constant);
      return;
  }
}

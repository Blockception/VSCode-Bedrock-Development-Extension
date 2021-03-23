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
import { CompletionItemKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../../Manager/Manager";
import { MolangFunctionDataItem } from "../../Molang/include";
import { DataType, DetectDataType } from "../../Types/Minecraft/Format/include";
import { CompletionBuilder } from "../Builder";

export function OnCompletionMolangVariable(doc: TextDocument, receiver: CompletionBuilder): void {
  let Type = DetectDataType(doc.uri);

  switch (Type) {
    case DataType.resource_particle:
      return Convert(Manager.Data.Molang.Particles.variable, receiver);

    case DataType.behaviour_animation:
    case DataType.behaviour_animation_controller:
    case DataType.behaviour_entity:
    case DataType.resource_animation:
    case DataType.resource_animation_controller:
    case DataType.resource_entity:
      return Convert(Manager.Data.Molang.Entities.variable, receiver);
  }
}

function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(Item.function, Item.documentation, CompletionItemKind.Variable);
  }
}

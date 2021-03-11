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
import { CommandCompletionContext } from "../../../completion/Commands/Context";
import { Block, Boolean, Coordinate } from "../../general/include";
import { ItemComponents, RawText } from "../../minecraft/json/include";
import { command } from "../include";
import { MCCommandParameterType } from "./include";

function toCompletion(Context: CommandCompletionContext): void {
  let Parameter = Context.Parameter;
  Context.receiver.Add(Parameter.Text, "keyword", CompletionItemKind.Keyword);
}

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let Parameter = Context.Parameter;

  //Check default option
  if (Parameter.Options) {
    //Accepted values
    if (Parameter.Options.acceptedValues) {
      Parameter.Options.acceptedValues.forEach((value) => {
        Context.receiver.Add(value, "accepted values", CompletionItemKind.Text);
      });
    }

    //Wildcard
    if (Parameter.Options.wildcard) {
      Context.receiver.Add("*", "wild card", CompletionItemKind.Constant);
    }
  }

  switch (Parameter.Type) {
    case MCCommandParameterType.block:
      return Block.ProvideCompletion(Context);
    case MCCommandParameterType.boolean:
      return Boolean.ProvideCompletion(Context);
    case MCCommandParameterType.command:
      return command.ProvideCompletion(Context.receiver);
    case MCCommandParameterType.coordinate:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.effect:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.entity:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.event:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.float:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.function:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.gamemode:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.integer:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.item:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.jsonItem:
      return ItemComponents.ProvideCompletion(Context.receiver);
    case MCCommandParameterType.jsonRawText:
      return RawText.ProvideCompletion(Context.receiver);
    case MCCommandParameterType.keyword:
      return toCompletion(Context);
    case MCCommandParameterType.objective:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.operation:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.particle:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.replaceMode:
      break;
    case MCCommandParameterType.selector:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.slotID:
      return;
    case MCCommandParameterType.slotType:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.sound:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.tag:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.tickingarea:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.unknown:
      return;
    case MCCommandParameterType.xp:
      return Coordinate.ProvideCompletion(Context);
  }
}

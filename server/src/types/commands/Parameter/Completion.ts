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
      return ProvideCompletion(Context);
    case MCCommandParameterType.boolean:
      return provideBooleanCompletion(Context);
    case MCCommandParameterType.command:
      return provideCommandCompletion(Context);
    case MCCommandParameterType.coordinate:
      return provideCoordinateCompletion(Context);
    case MCCommandParameterType.effect:
      return provideEffectCompletion(Context);
    case MCCommandParameterType.entity:
      return provideEntityCompletion(Context);
    case MCCommandParameterType.event:
      return provideEventCompletion(Context);
    case MCCommandParameterType.float:
      return provideFloatCompletion(Context);
    case MCCommandParameterType.function:
      return provideFunctionCompletion(Context);
    case MCCommandParameterType.gamemode:
      return provideGamemodeCompletion(Context);
    case MCCommandParameterType.integer:
      return provideIntegerCompletion(Context);
    case MCCommandParameterType.item:
      return provideItemCompletion(Context);
    case MCCommandParameterType.jsonItem:
      return ItemComponents.Completion(Context);
    case MCCommandParameterType.jsonRawText:
      return RawText.Completion(Context);
    case MCCommandParameterType.keyword:
      return toCompletion(Context);
    case MCCommandParameterType.objective:
      return provideObjectiveCompletion(Context);
    case MCCommandParameterType.operation:
      return ProvideModeCompletion(Context);
    case MCCommandParameterType.particle:
      return provideParticleCompletion(Context);
    case MCCommandParameterType.replaceMode:
      break;
    case MCCommandParameterType.selector:
      return provideSelectorCompletion(Context);
    case MCCommandParameterType.slotID:
      return;
    case MCCommandParameterType.slotType:
      return ProvideModeCompletion(Context);
    case MCCommandParameterType.sound:
      return provideSoundCompletion(Context);
    case MCCommandParameterType.tag:
      return provideTagCompletion(Context);
    case MCCommandParameterType.tickingarea:
      return provideTickingareaCompletion(Context);
    case MCCommandParameterType.unknown:
      return;
    case MCCommandParameterType.xp:
      return provideXPCompletion(Context);
  }
}

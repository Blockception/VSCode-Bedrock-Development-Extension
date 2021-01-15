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
import { CompletionItem, CompletionItemKind, CompletionList } from "vscode-languageserver";
import { ItemComponents, RawText } from "../../minecraft/json/include";
import { provideParticleCompletion } from "../../minecraft/resource/particle/Completion";
import { LocationWord } from "../../../code/words/include";
import { provideBlockCompletion } from "../../general/Block/include";
import { provideBooleanCompletion } from "../../general/Boolean/include";
import { provideCoordinateCompletion } from "../../general/Coordinate/include";
import { provideEffectCompletion } from "../../general/Effect/include";
import { provideEntityCompletion } from "../../general/Entity/include";
import { provideEventCompletion } from "../../general/Event/include";
import { provideFloatCompletion } from "../../general/Float/include";
import { provideFunctionCompletion } from "../../general/Functions/include";
import { provideIntegerCompletion } from "../../general/Integer/include";
import { provideItemCompletion } from "../../general/Item/include";
import { provideObjectiveCompletion } from "../../general/Objectives/include";
import { provideSelectorCompletion } from "../../general/Selector/Completion/include";
import { provideSoundCompletion } from "../../general/Sound/include";
import { provideTagCompletion } from "../../general/Tag/include";
import { provideTickingareaCompletion } from "../../general/Tickingarea/include";
import { provideXPCompletion } from "../../general/Xp/include";
import { CommandIntr } from "../interpertation/include";
import { provideCommandCompletion } from "../command/Completion";
import { MCCommandParameter, MCCommandParameterType } from "./include";
import { ProvideModeCompletion } from '../modes/Completion';
import { OperationModes } from '../modes/operation/operation';
import { provideGamemodeCompletion } from '../../general/Gamemode/include';
import { SlotTypeModes } from '../../general/slot type/slot type';

function toCompletion(parameter: MCCommandParameter): CompletionItem {
  let Out: CompletionItem = {
    label: parameter.Text,
    documentation: "keyword",
    kind: CompletionItemKind.Keyword,
  };

  return Out;
}

export function ProvideCompletionMCCommandParameter(
  Parameter: MCCommandParameter,
  Command: CommandIntr,
  pos: number,
  receiver: CompletionList,
  Current: LocationWord | undefined
): void {
  //Check default option
  if (Parameter.Options) {
    //Accepted values
    if (Parameter.Options.acceptedValues) {
      Parameter.Options.acceptedValues.forEach((value) => {
        receiver.items.push({ label: value, kind: CompletionItemKind.Text });
      });
    }

    //Wildcard
    if (Parameter.Options.wildcard) {
      receiver.items.push({ label: "*", kind: CompletionItemKind.Constant });
    }
  }

  switch (Parameter.Type) {
    case MCCommandParameterType.block:
      return provideBlockCompletion(receiver);

    case MCCommandParameterType.boolean:
      return provideBooleanCompletion(receiver);

    case MCCommandParameterType.command:
      return provideCommandCompletion(receiver);

    case MCCommandParameterType.coordinate:
      return provideCoordinateCompletion(receiver);

    case MCCommandParameterType.effect:
      return provideEffectCompletion(receiver);

    case MCCommandParameterType.entity:
      return provideEntityCompletion(receiver);

    //Entity events
    case MCCommandParameterType.event:
      return provideEventCompletion(receiver, Command);

    case MCCommandParameterType.float:
      return provideFloatCompletion(receiver, Parameter.Options);

    case MCCommandParameterType.function:
      return provideFunctionCompletion(receiver);

    case MCCommandParameterType.gamemode:
      return provideGamemodeCompletion(receiver);

    case MCCommandParameterType.integer:
      return provideIntegerCompletion(receiver, Parameter.Options);

    case MCCommandParameterType.item:
      return provideItemCompletion(receiver);

    case MCCommandParameterType.jsonItem:
      return ItemComponents.Completion(receiver.items);

    case MCCommandParameterType.jsonRawText:
      return RawText.Completion(receiver.items);

    case MCCommandParameterType.keyword:
      receiver.items.push(toCompletion(Parameter));
      return;

    case MCCommandParameterType.objective:
      return provideObjectiveCompletion(receiver);

    case MCCommandParameterType.operation:
      return ProvideModeCompletion(OperationModes, receiver);

    case MCCommandParameterType.particle:
      return provideParticleCompletion(receiver);

    case MCCommandParameterType.replaceMode:
      //TODO
      break;

    case MCCommandParameterType.selector:
      return provideSelectorCompletion(receiver, Current, pos, Parameter);

    case MCCommandParameterType.slotID:
      //TODO
      break;

    case MCCommandParameterType.slotType:
      return ProvideModeCompletion(SlotTypeModes, receiver);

    case MCCommandParameterType.sound:
      return provideSoundCompletion(receiver);

    case MCCommandParameterType.tag:
      return provideTagCompletion(receiver);

    case MCCommandParameterType.tickingarea:
      return provideTickingareaCompletion(receiver);

    case MCCommandParameterType.unknown:
      //TODO
      break;

    case MCCommandParameterType.xp:
      return provideXPCompletion(receiver);
  }
}

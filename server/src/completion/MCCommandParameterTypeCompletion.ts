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
import { CompletionItem, CompletionItemKind, CompletionList } from 'vscode-languageserver';
import { LocationWord } from '../code/include';
import { Database } from '../database/include';
import { MCCommandParameter, CommandIntr, MCCommandParameterType } from '../minecraft/commands/include';
import { ItemComponents, RawText } from '../minecraft/json/include';
import { provideBlockCompletion } from '../minecraft/types/Block/include';
import { provideBooleanCompletion } from '../minecraft/types/Boolean/include';
import { provideCoordinateCompletion } from '../minecraft/types/Coordinate/include';
import { provideEffectCompletion } from '../minecraft/types/Effect/include';
import { provideEntityCompletion } from '../minecraft/types/Entity/include';
import { provideEventCompletion } from '../minecraft/types/Event/include';
import { provideFloatCompletion } from '../minecraft/types/Float/include';
import { provideFunctionCompletion } from '../minecraft/types/Functions/include';
import { provideIntegerCompletion } from '../minecraft/types/Integer/include';
import { provideItemCompletion } from '../minecraft/types/Item/include';
import { Kinds } from '../minecraft/types/Kinds';
import { provideObjectiveCompletion } from '../minecraft/types/Objectives/include';
import { provideSelectorCompletion } from '../minecraft/types/Selector/Completion/include';
import { provideSoundCompletion } from '../minecraft/types/Sound/include';
import { provideTagCompletion } from '../minecraft/types/Tag/include';
import { provideTickingareaCompletion } from '../minecraft/types/Tickingarea/include';
import { provideXPCompletion } from '../minecraft/types/Xp/include';
import { Completion, provideCommandCompletion } from './include';


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
      return provideFloatCompletion(receiver, 0.0, 10.0);
      break;

    case MCCommandParameterType.function:
      return provideFunctionCompletion(receiver);

    case MCCommandParameterType.gamemode:
      //TODO
      break;

    case MCCommandParameterType.integer:
      return provideIntegerCompletion(receiver, 0, 10);

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

    case MCCommandParameterType.particle:
      return Completion.Convert(Database.Data.Resourcepack.Particles, Kinds.Completion.Particle, receiver.items);

    case MCCommandParameterType.replaceMode:
      //TODO
      break;

    case MCCommandParameterType.selector:
      return provideSelectorCompletion(receiver, Current, pos, true, true, true);

    case MCCommandParameterType.selectorPlayer:
      return provideSelectorCompletion(receiver, Current, pos, false, true, true);

    case MCCommandParameterType.slotID:
      //TODO
      break;

    case MCCommandParameterType.slotType:
      //TODO
      break;

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

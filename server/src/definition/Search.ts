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
import { Location } from "vscode-languageserver";
import { MCCommandParameterType } from "../minecraft/commands/include";
import { Database } from "../database/Database";
import { DataCollector } from "../database/DataCollector";
import { Identifiable, Locatable } from "../minecraft/Interfaces/include";

export function SearchDefinition(text: string, type: MCCommandParameterType[]): Location[] {
  let Out: Location[] = [];

  //prune types
  type.filter((t) => {
    switch (t) {
      case MCCommandParameterType.block:
      case MCCommandParameterType.entity:
      case MCCommandParameterType.function:
      case MCCommandParameterType.item:
      case MCCommandParameterType.objective:
      case MCCommandParameterType.selector:
      case MCCommandParameterType.selectorPlayer:
      case MCCommandParameterType.sound:
      case MCCommandParameterType.tag:
      case MCCommandParameterType.tickingarea:
        //keep
        return true;

      default:
        return false;
    }
  });

  if (type.length <= 0) {
    return Out;
  }

  //foreach dataset
  SearchDefinitionIn(text, type, Out);

  return Out;
}

export function SearchDefinitionIn(text: string, type: MCCommandParameterType[], receiver: Location[]) {
  let Data = Database.Data.General;
  for (let I = 0; I < type.length; I++) {
    switch (type[I]) {
      case MCCommandParameterType.block:
        SearchInCollection(text, Data.Blocks, receiver);
        break;

      case MCCommandParameterType.entity:
        SearchInCollection(text, Data.Entities, receiver);
        break;

      case MCCommandParameterType.function:
        SearchInCollection(text, Data.Functions, receiver);
        break;

      case MCCommandParameterType.item:
        SearchInCollection(text, Data.Items, receiver);
        break;

      case MCCommandParameterType.objective:
        SearchInCollection(text, Data.Objectives, receiver);
        break;

      case MCCommandParameterType.selector:
      case MCCommandParameterType.selectorPlayer:
        SearchInCollection(text, Data.FakeEntities, receiver);
        break;

      case MCCommandParameterType.sound:
        SearchInCollection(text, Data.Sounds, receiver);
        break;

      case MCCommandParameterType.tag:
        SearchInCollection(text, Data.Tag, receiver);
        break;

      case MCCommandParameterType.tickingarea:
        SearchInCollection(text, Data.TickingAreas, receiver);
        break;
    }
  }
}

function SearchInCollection<T extends Identifiable & Locatable>(text: string, collection: DataCollector<T>, receiver: Location[]): void {
  collection.ForEachID(text, (f) => receiver.push(f.Location));
}

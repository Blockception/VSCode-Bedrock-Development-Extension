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
import { Location, Range } from "vscode-languageserver";
import { MCCommandParameterType } from "../minecraft/commands/include";
import { Database } from "../Database";
import { MinecraftData } from "../minecraft/Minecraft Data";
import { GetFilepath } from "../code/Url";

export function SearchDefinition(
  text: string,
  type: MCCommandParameterType[]
): Location[] {
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
  Database.Data.forEach((data, key) => {
    SearchDefinitionIn(text, type, data, key, Out);
  });

  return Out;
}

export function SearchDefinitionIn(
  text: string,
  type: MCCommandParameterType[],
  data: MinecraftData,
  uri: string,
  receiver: Location[]
) {
  for (let I = 0; I < type.length; I++) {
    switch (type[I]) {
      case MCCommandParameterType.block:
        data.Blocks.forEach((block) => {
          if (block.Name == text) receiver.push(block.Location);
        });
        break;

      case MCCommandParameterType.entity:
        data.Entities.forEach((entity) => {
          if (entity.Identifier == text) receiver.push(entity.Location);
        });
        break;

      case MCCommandParameterType.function:
        if (uri.includes(text)) {
          receiver.push(
            Location.create(GetFilepath(uri), Range.create(0, 0, 0, 1))
          );
        }
        break;

      case MCCommandParameterType.item:
        data.Items.forEach((item) => {
          if (item.Identifier == text) receiver.push(item.Location);
        });
        break;

      case MCCommandParameterType.objective:
        data.Objectives.forEach((objective) => {
          if (objective.Name == text) receiver.push(objective.Location);
        });
        break;

      case MCCommandParameterType.selector:
      case MCCommandParameterType.selectorPlayer:
        data.FakeEntities.forEach((fp) => {
          if (fp.text == text) receiver.push(fp.CreateLocation());
        });
        break;

      case MCCommandParameterType.sound:
        data.Sounds.forEach((sound) => {
          if (sound.Name == text) receiver.push(sound.Location);
        });
        break;

      case MCCommandParameterType.tag:
        data.Tag.forEach((Tag) => {
          if (Tag.Name == text) receiver.push(Tag.Location);
        });
        break;

      case MCCommandParameterType.tickingarea:
        data.TickingAreas.forEach((ta) => {
          if (ta.Name == text) receiver.push(ta.Location);
        });
        break;
    }
  }
}

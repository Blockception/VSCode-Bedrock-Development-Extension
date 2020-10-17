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
import { Manager } from "../../manager/Manager";
import { IsBoolean } from "../types/Boolean/Boolean";
import { IsSelector } from "../types/include";
import { IsJson } from "../types/Json/Json";
import { CommandInfo } from "./CommandInfo";
import { CommandIntr } from "./CommandIntr";
import { MCCommand } from "./MCCommand";
import { MCCommandParameterType } from "./MCCommandParameterType";

export class CommandManager {
  Subset: Map<string, CommandInfo[]>;

  constructor() {
    this.Subset = new Map<string, CommandInfo[]>();
  }

  add(com: MCCommand): void {
    let Info = new CommandInfo(com);
    let Storage = this.Subset.get(com.name);

    if (Storage == undefined) {
      this.Subset.set(com.name, [Info]);
    } else {
      Storage.push(Info);
    }
  }

  get(com: string): CommandInfo[] {
    let Storage = this.Subset.get(com);

    if (Storage == undefined) {
      return [];
    }

    return Storage;
  }

  has(com: string): boolean {
    return this.Subset.has(com);
  }

  getBestMatches(com: CommandIntr): CommandInfo[] {
    let Storage = this.Subset.get(com.GetCommandKeyword());
    let Out: CommandInfo[] = [];

    if (Storage == undefined) {
      return Out;
    }

    for (let I = 0; I < Storage.length; I++) {
      if (isMatch(com, Storage[I].Command)) Out.push(Storage[I]);
    }

    return Out;
  }
}

export function isMatch(com: CommandIntr, pattern: MCCommand): boolean {
  let Limit = pattern.parameters.length;

  //has sub commands
  let HasSubCommand = pattern.includes(MCCommandParameterType.command);

  if (!HasSubCommand && Limit < com.Paramaters.length) return false;

  if (Limit > com.Paramaters.length) {
    Limit = com.Paramaters.length;
  }

  for (let I = 0; I < Limit; I++) {
    let comPar = com.Paramaters[I];
    let comText = comPar.text;
    let patPar = pattern.parameters[I];

    switch (patPar.Type) {
      case MCCommandParameterType.block:
      case MCCommandParameterType.coordinate:
      case MCCommandParameterType.effect:
      case MCCommandParameterType.entity:
      case MCCommandParameterType.event:
      case MCCommandParameterType.float:
      case MCCommandParameterType.function:
      case MCCommandParameterType.integer:
      case MCCommandParameterType.item:
      case MCCommandParameterType.objective:
      case MCCommandParameterType.sound:
      case MCCommandParameterType.tag:
      case MCCommandParameterType.xp:
        //TODO program matches types for these
        continue;

      case MCCommandParameterType.boolean:
        if (!IsBoolean(comText)) {
          return false;
        }
        break;

      case MCCommandParameterType.command:
        if (!Manager.Data.Commands.has(comText)) {
          return false;
        }
        break;

      case MCCommandParameterType.jsonItem:
      case MCCommandParameterType.jsonRawText:
        if (!IsJson(comText)) {
          return false;
        }
        break;

      case MCCommandParameterType.keyword:
        if (comText != patPar.Text) {
          return false;
        }
        break;

      case MCCommandParameterType.selector:
      case MCCommandParameterType.selectorPlayer:
        if (!IsSelector(comText)) {
          return false;
        }
        break;
    }
  }

  return true;
}

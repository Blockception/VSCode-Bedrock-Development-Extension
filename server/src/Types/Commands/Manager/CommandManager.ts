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
import { Manager } from "../../../Manager/Manager";
import { IsBoolean } from "../../General/Boolean/Boolean";
import { IsCoordinate } from "../../General/Coordinate/include";
import { IsFloat } from "../../General/Float/include";
import { IsInteger } from "../../General/Integer/include";
import { IsJson } from "../../General/Json/Json";
import { IsSelector } from "../../General/Selector/include";
import { IsTickingArea } from "../../General/Tickingarea/include";
import { CommandInfo } from "../Info/CommandInfo";
import { CommandIntr } from "../Interpertation/CommandIntr";
import { MCCommand } from "../Command/MCCommand";
import { MCCommandParameterType } from "../Parameter/include";
import { BlockStates } from "../../General/include";
import { OldBlockModeModes } from "../Modes/OldBlockMode/OldBlockMode";
import { IsMode } from "../Modes/include";

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

    if (Storage.length == 1) return Storage;

    for (let I = 0; I < Storage.length; I++) {
      if (isMatch(com, Storage[I].Command)) Out.push(Storage[I]);
    }

    return Out;
  }
}

export function isMatch(com: CommandIntr, pattern: MCCommand): boolean {
  let Limit = pattern.parameters.length;

  if (Limit > com.Parameters.length) {
    Limit = com.Parameters.length;
  }

  for (let I = 0; I < Limit; I++) {
    let comPar = com.Parameters[I];
    let comText = comPar.text;
    let patPar = pattern.parameters[I];

    if (patPar.Options) {
      if (patPar.Options.acceptedValues) {
        if (patPar.Options.acceptedValues.includes(comText)) {
          continue;
        }
      }
    }

    switch (patPar.Type) {
      case MCCommandParameterType.block:
      case MCCommandParameterType.cameraShakeType:
      case MCCommandParameterType.cloneMode:
      case MCCommandParameterType.difficulty:
      case MCCommandParameterType.entity:
      case MCCommandParameterType.event:
      case MCCommandParameterType.fillMode:
      case MCCommandParameterType.function:
      case MCCommandParameterType.gamemode:
      case MCCommandParameterType.item:
      case MCCommandParameterType.locateFeature:
      case MCCommandParameterType.maskMode:
      case MCCommandParameterType.mirror:
      case MCCommandParameterType.musicRepeatMode:
      case MCCommandParameterType.objective:
      case MCCommandParameterType.operation:
      case MCCommandParameterType.particle:
      case MCCommandParameterType.replaceMode:
      case MCCommandParameterType.rideRules:
      case MCCommandParameterType.rotation:
      case MCCommandParameterType.saveMode:
      case MCCommandParameterType.slotID:
      case MCCommandParameterType.slotType:
      case MCCommandParameterType.sound:
      case MCCommandParameterType.string:
      case MCCommandParameterType.structureAnimationMode:
      case MCCommandParameterType.tag:
      case MCCommandParameterType.target:
      case MCCommandParameterType.teleportRules:
      case MCCommandParameterType.unknown:
      case MCCommandParameterType.xp:
        //TODO program matches types for these
        continue;

      case MCCommandParameterType.boolean:
        if (!IsBoolean(comText)) return false;
        break;

      case MCCommandParameterType.blockStates:
        if (!BlockStates.BlockStates.IsStates(comText)) return false;
        break;

      case MCCommandParameterType.command:
        if (!Manager.Data.Commands.has(comText)) return false;
        break;

      case MCCommandParameterType.coordinate:
        if (!IsCoordinate(comText)) return false;
        break;

      case MCCommandParameterType.effect:
        if (comText === "clear") return false;
        break;

      case MCCommandParameterType.float:
        if (!IsFloat(comText)) return false;
        break;

      case MCCommandParameterType.integer:
        if (!IsInteger(comText)) return false;
        break;

      case MCCommandParameterType.jsonItem:
      case MCCommandParameterType.jsonRawText:
        if (!IsJson(comText)) return false;
        break;

      case MCCommandParameterType.keyword:
        if (comText != patPar.Text) return false;
        break;

      case MCCommandParameterType.oldBlockMode:
        if (!IsMode(OldBlockModeModes, comText)) return false;
        break;

      case MCCommandParameterType.selector:
        if (!IsSelector(comText, patPar.Options)) return false;
        break;

      case MCCommandParameterType.tickingarea:
        if (!IsTickingArea(comText)) return false;
        break;
    }
  }

  return true;
}

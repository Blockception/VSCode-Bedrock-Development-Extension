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
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import {
  Block,
  BlockStates,
  Boolean,
  Coordinate,
  Effect,
  Entity,
  Event,
  Float,
  Functions,
  Gamemode,
  Integer,
  Item,
  Objectives,
  Selector,
  Slot_id,
  Slot_type,
  Sound,
  Tag,
  Tickingarea,
  Xp,
} from "../../General/include";
import { ItemComponents, RawText } from "../../Minecraft/Json/include";
import { Particle } from "../../Minecraft/Resource/include";
import { Command } from "../include";
import { CameraShakeMode, CloneMode, Difficulty, LocateFeature } from "../Modes/include";
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
    case MCCommandParameterType.blockStates:
      return BlockStates.ProvideCompletion(Context);
    case MCCommandParameterType.boolean:
      return Boolean.ProvideCompletion(Context);
    case MCCommandParameterType.cameraShakeType:
      return CameraShakeMode.ProvideCompletion(Context);
    case MCCommandParameterType.cloneMode:
      return CloneMode.ProvideCompletion(Context);
    case MCCommandParameterType.command:
      return Command.ProvideCompletion(Context.receiver);
    case MCCommandParameterType.coordinate:
      return Coordinate.ProvideCompletion(Context);
    case MCCommandParameterType.difficulty:
      return Difficulty.ProvideCompletion(Context);
    case MCCommandParameterType.effect:
      return Effect.ProvideCompletion(Context);
    case MCCommandParameterType.entity:
      return Entity.ProvideCompletion(Context);
    case MCCommandParameterType.event:
      return Event.ProvideCompletion(Context);
    case MCCommandParameterType.float:
      return Float.ProvideCompletion(Context);
    case MCCommandParameterType.fillMode:
      //TODO
      return;
    case MCCommandParameterType.function:
      return Functions.ProvideCompletion(Context);
    case MCCommandParameterType.gamemode:
      return Gamemode.ProvideCompletion(Context);
    case MCCommandParameterType.integer:
      return Integer.ProvideCompletion(Context);
    case MCCommandParameterType.item:
      return Item.ProvideCompletion(Context);
    case MCCommandParameterType.jsonItem:
      return ItemComponents.ProvideCompletion(Context.receiver);
    case MCCommandParameterType.jsonRawText:
      return RawText.ProvideCompletion(Context.receiver);
    case MCCommandParameterType.keyword:
      return toCompletion(Context);
    case MCCommandParameterType.locateFeature:
      return LocateFeature.ProvideCompletion(Context);
    case MCCommandParameterType.maskMode:
      //TODO
      return;
    case MCCommandParameterType.mirror:
      //TODO
      return;
    case MCCommandParameterType.musicRepeatMode:
      //TODO
      return;
    case MCCommandParameterType.oldBlockMode:
      return OldBlockMode.ProvideCompletion(Context);
    case MCCommandParameterType.objective:
      return Objectives.ProvideCompletion(Context);
    case MCCommandParameterType.operation:
      return Operation.ProvideCompletion(Context);
    case MCCommandParameterType.particle:
      return Particle.ProvideCompletion(Context);
    case MCCommandParameterType.replaceMode:
      //TODO
      return;
    case MCCommandParameterType.rideRules:
      //TODO
      return;
    case MCCommandParameterType.rotation:
      //TODO
      return;
    case MCCommandParameterType.saveMode:
      //TODO
      return;
    case MCCommandParameterType.selector:
      return Selector.Completion.ProvideCompletion(Context);
    case MCCommandParameterType.slotID:
      return Slot_id.ProvideCompletion(Context);
    case MCCommandParameterType.slotType:
      return Slot_type.ProvideCompletion(Context);
    case MCCommandParameterType.sound:
      return Sound.ProvideCompletion(Context);
    case MCCommandParameterType.string:
      //TODO
      return;
    case MCCommandParameterType.structureAnimationMode:
      //TODO
      return;
    case MCCommandParameterType.target:
      //TODO
      return;
    case MCCommandParameterType.tag:
      return Tag.ProvideCompletion(Context);
    case MCCommandParameterType.teleportRules:
      //TODO
      return;
    case MCCommandParameterType.tickingarea:
      return Tickingarea.ProvideCompletion(Context);

    case MCCommandParameterType.xp:
      return Xp.ProvideCompletion(Context);

    default:
    case MCCommandParameterType.unknown:
      return;
  }
}

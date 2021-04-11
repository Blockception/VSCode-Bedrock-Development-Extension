import { ValidationData } from "../../../Validation/include";
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
  Keyword,
  Objectives,
  Selector,
  Slot_id,
  Slot_type,
  Sound,
  String,
  Tag,
  Tickingarea,
  Xp,
} from "../../General/include";
import { MCCommandParameter, MCCommandParameterType } from "./include";
import { CommandIntr } from "../Interpertation/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { Command } from "../include";
import { LocationWord } from "bc-vscode-words";
import { Particle } from "../../Minecraft/Resource/include";
import {
  CameraShakeMode,
  CloneMode,
  FillMode,
  LocateFeature,
  MaskMode,
  MirrorMode,
  MusicRepeatMode,
  OldBlockMode,
  OperationMode,
  ReplaceMode,
  RideRulesMode,
  RotationMode,
  SaveMode,
  StructureAnimationMode,
  TeleportRulesMode,
} from "../Modes/include";

/**Diagnoses the single parameter
 * @param pattern
 * @param data
 * @param validation
 * @param builder
 */
export function DiagnoseParameter(pattern: MCCommandParameter, data: LocationWord, validation: ValidationData, builder: DiagnosticsBuilder, Com: CommandIntr): void {
  if (pattern === undefined || data === undefined) return;

  if (pattern.Options) {
    //If wildcard is allowed and the text is an wildcard, then skip diagnose
    if (pattern.Options.wildcard && pattern.Options.wildcard === true) {
      if (data.text === "*") return;
    }

    //If accepted values is filled in and the text is a match, then skip diagnose
    if (pattern.Options.acceptedValues) {
      if (pattern.Options.acceptedValues.includes(data.text)) {
        return;
      }
    }
  }

  switch (pattern.Type) {
    case MCCommandParameterType.block:
      return Block.ProvideDiagnose(data, builder);

    case MCCommandParameterType.blockStates:
      return BlockStates.ProvideDiagnose(data, builder);

    case MCCommandParameterType.boolean:
      return Boolean.ProvideDiagnose(data, builder);

    case MCCommandParameterType.cameraShakeType:
      return CameraShakeMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.cloneMode:
      return CloneMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.command:
      return Command.DiagnoseCommandParameter(data, builder);

    case MCCommandParameterType.coordinate:
      return Coordinate.ProvideDiagnose(data, builder);

    case MCCommandParameterType.effect:
      return Effect.ProvideDiagnose(data, builder);

    case MCCommandParameterType.entity:
      return Entity.ProvideDiagnose(data, builder);

    case MCCommandParameterType.event:
      return Event.ProvideDiagnose(data, builder); //TODO provide entity ID

    case MCCommandParameterType.fillMode:
      return FillMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.float:
      return Float.ProvideDiagnose(data, builder);

    case MCCommandParameterType.function:
      return Functions.ProvideDiagnose(data, builder);

    case MCCommandParameterType.gamemode:
      return Gamemode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.integer:
      return Integer.ProvideDiagnose(data, builder);

    case MCCommandParameterType.item:
      return Item.ProvideDiagnose(data, builder);

    case MCCommandParameterType.jsonItem:
    case MCCommandParameterType.jsonRawText:
      //TODO
      return;

    case MCCommandParameterType.keyword:
      return Keyword.ProvideDiagnose(pattern, data, builder);

    case MCCommandParameterType.locateFeature:
      return LocateFeature.ProvideDiagnose(data, builder);

    case MCCommandParameterType.maskMode:
      return MaskMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.mirror:
      return MirrorMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.musicRepeatMode:
      return MusicRepeatMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.oldBlockMode:
      return OldBlockMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.objective:
      return Objectives.ProvideDiagnose(data, validation, builder);

    case MCCommandParameterType.operation:
      return OperationMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.particle:
      return Particle.ProvideDiagnose(data, builder);

    case MCCommandParameterType.replaceMode:
      return ReplaceMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.rideRules:
      return RideRulesMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.rotation:
      return RotationMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.saveMode:
      return SaveMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.selector:
      return Selector.ProvideDiagnose(pattern, data, builder, validation);

    case MCCommandParameterType.slotID:
      return Slot_id.ProvideDiagnose(data, Com, builder);

    case MCCommandParameterType.slotType:
      return Slot_type.ProvideDiagnose(data, builder);

    case MCCommandParameterType.sound:
      return Sound.ProvideDiagnose(data, builder);

    case MCCommandParameterType.string:
      return String.ProvideDiagnose(data, builder);

    case MCCommandParameterType.structureAnimationMode:
      return StructureAnimationMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.tag:
      return Tag.ProvideDiagnose(data, validation, builder);

    case MCCommandParameterType.teleportRules:
      return TeleportRulesMode.ProvideDiagnose(data, builder);

    case MCCommandParameterType.tickingarea:
      return Tickingarea.ProvideDiagnose(data, builder);

    case MCCommandParameterType.unknown:
      return;

    case MCCommandParameterType.xp:
      Xp.ProvideDiagnose(data, builder);
      return;
  }
}

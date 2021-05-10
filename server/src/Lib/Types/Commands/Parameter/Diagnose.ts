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
  Gamemode,
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
export function DiagnoseParameter(pattern: MCCommandParameter, data: LocationWord, builder: DiagnosticsBuilder, Com: CommandIntr): void {
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
      return Block.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.blockStates:
      return BlockStates.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.boolean:
      return Boolean.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.cameraShakeType:
      return CameraShakeMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.cloneMode:
      return CloneMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.command:
      return Command.DiagnoseCommandParameter(data, builder);

    case MCCommandParameterType.coordinate:
      return Coordinate.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.effect:
      return Effect.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.entity:
      return Entity.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.event:
      return Event.ProvideDiagnostic(data, builder); //TODO provide entity ID

    case MCCommandParameterType.fillMode:
      return FillMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.float:
      return Float.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.function:
      return Functions.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.gamemode:
      return Gamemode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.integer:
      return Integer.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.item:
      return Item.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.jsonItem:
    case MCCommandParameterType.jsonRawText:
      //TODO
      return;

    case MCCommandParameterType.keyword:
      return Keyword.ProvideDiagnostic(pattern, data, builder);

    case MCCommandParameterType.locateFeature:
      return LocateFeature.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.maskMode:
      return MaskMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.mirror:
      return MirrorMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.musicRepeatMode:
      return MusicRepeatMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.oldBlockMode:
      return OldBlockMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.objective:
      return Objectives.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.operation:
      return OperationMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.particle:
      return Particle.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.replaceMode:
      return ReplaceMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.rideRules:
      return RideRulesMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.rotation:
      return RotationMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.saveMode:
      return SaveMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.selector:
      return Selector.ProvideDiagnostic(pattern, data, builder);

    case MCCommandParameterType.slotID:
      return Slot_id.ProvideDiagnostic(data, Com, builder);

    case MCCommandParameterType.slotType:
      return Slot_type.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.sound:
      return Sound.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.string:
      return String.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.structureAnimationMode:
      return StructureAnimationMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.tag:
      return Tag.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.teleportRules:
      return TeleportRulesMode.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.tickingarea:
      return Tickingarea.ProvideDiagnostic(data, builder);

    case MCCommandParameterType.unknown:
      return;

    case MCCommandParameterType.xp:
      Xp.ProvideDiagnostic(data, builder);
      return;
  }
}

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
import { IsXpLevel } from "../../General/Xp/Functions";
import { TeleportRulesMode } from "../Modes/TeleportRulesMode/TeleportRulesMode";
import { StructureAnimationMode } from "../Modes/StructureAnimationMode/StructureAnimationMode";
import { RotationMode } from "../Modes/RotationMode/RotationMode";
import { SaveMode } from "../Modes/SaveMode/RideRulesMode";
import { SlotTypeModes } from "../../General/Slot type/Slot type";
import { RideRulesMode } from "../Modes/RideRulesMode/RideRulesMode";
import { ReplaceMode } from "../Modes/ReplaceMode/ReplaceMode";
import { OperationModes } from "../Modes/OperationMode/Operation";
import { LocateFeatureMode } from "../Modes/LocateFeature/LocateFeature";
import { MaskMode } from "../Modes/MaskMode/MaskMode";
import { MirrorMode } from "../Modes/MirrorMode/MirrorMode";
import { MusicRepeatMode } from "../Modes/MusicRepeatMode/MusicRepeatMode";
import { CameraShakeModes } from "../Modes/CameraShakeMode/CameraShake";
import { IsMode } from "../Modes/include";
import { CloneMode } from "../Modes/CloneMode/CloneMode";
import { DifficultyMode } from "../Modes/Difficulty/Difficulty";
import { FillMode } from "../Modes/FillMode/FillMode";
import { GameMode } from "../Modes/Gamemode/Gamemode";

/**
 *
 */
export class CommandManager {
  Subset: Map<string, CommandInfo[]>;

  constructor() {
    this.Subset = new Map<string, CommandInfo[]>();
  }

  /**
   *
   * @param com
   */
  add(com: MCCommand): void {
    let Info = new CommandInfo(com);
    let Storage = this.Subset.get(com.name);

    if (Storage == undefined) {
      this.Subset.set(com.name, [Info]);
    } else {
      Storage.push(Info);
    }
  }

  /**
   *
   * @param com
   * @returns
   */
  get(com: string): CommandInfo[] {
    let Storage = this.Subset.get(com);

    if (Storage == undefined) {
      return [];
    }

    return Storage;
  }

  /**
   *
   * @param com
   * @returns
   */
  has(com: string): boolean {
    return this.Subset.has(com);
  }

  /**
   *
   * @param com
   * @returns
   */
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

/**
 *
 * @param com
 * @param pattern
 * @returns
 */
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
      case MCCommandParameterType.entity:
      case MCCommandParameterType.event:
      case MCCommandParameterType.function:
      case MCCommandParameterType.item:
      case MCCommandParameterType.objective:
      case MCCommandParameterType.particle:
      case MCCommandParameterType.sound:
      case MCCommandParameterType.string:
      case MCCommandParameterType.tag:
      case MCCommandParameterType.unknown:
        //TODO program matches types for these
        continue;

      case MCCommandParameterType.boolean:
        if (!IsBoolean(comText)) return false;
        break;

      case MCCommandParameterType.blockStates:
        if (!BlockStates.BlockStates.IsStates(comText)) return false;
        break;

      case MCCommandParameterType.cameraShakeType:
        if (!IsMode(CameraShakeModes, comText)) return false;
        break;

      case MCCommandParameterType.command:
        if (!Manager.Data.Commands.has(comText)) return false;
        break;

      case MCCommandParameterType.coordinate:
        if (!IsCoordinate(comText)) return false;
        break;

      case MCCommandParameterType.cloneMode:
        if (!IsMode(CloneMode, comText)) return false;
        break;

      case MCCommandParameterType.difficulty:
        if (!IsMode(DifficultyMode, comText)) return false;
        break;

      case MCCommandParameterType.effect:
        if (comText === "clear") return false;
        break;

      case MCCommandParameterType.fillMode:
        if (!IsMode(FillMode, comText)) return false;
        break;

      case MCCommandParameterType.float:
        if (!IsFloat(comText)) return false;
        break;

      case MCCommandParameterType.gamemode:
        if (!IsMode(GameMode, comText)) return false;
        break;

      case MCCommandParameterType.locateFeature:
        if (!IsMode(LocateFeatureMode, comText)) return false;
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

      case MCCommandParameterType.maskMode:
        if (!IsMode(MaskMode, comText)) return false;
        break;

      case MCCommandParameterType.mirror:
        if (!IsMode(MirrorMode, comText)) return false;
        break;

      case MCCommandParameterType.musicRepeatMode:
        if (!IsMode(MusicRepeatMode, comText)) return false;
        break;

      case MCCommandParameterType.oldBlockMode:
        if (!IsMode(OldBlockModeModes, comText)) return false;
        break;

      case MCCommandParameterType.operation:
        if (!IsMode(OperationModes, comText)) return false;
        break;

      case MCCommandParameterType.replaceMode:
        if (!IsMode(ReplaceMode, comText)) return false;
        break;

      case MCCommandParameterType.rideRules:
        if (!IsMode(RideRulesMode, comText)) return false;
        break;

      case MCCommandParameterType.rotation:
        if (!IsMode(RotationMode, comText)) return false;
        break;

      case MCCommandParameterType.saveMode:
        if (!IsMode(SaveMode, comText)) return false;
        break;

      case MCCommandParameterType.selector:
        if (!IsSelector(comText, patPar.Options)) return false;
        break;

      case MCCommandParameterType.slotType:
        if (!IsMode(SlotTypeModes, comText)) return false;
        break;

      case MCCommandParameterType.slotID:
        if (!IsInteger(comText)) return false;
        break;

      case MCCommandParameterType.structureAnimationMode:
        if (!IsMode(StructureAnimationMode, comText)) return false;
        break;

      case MCCommandParameterType.teleportRules:
        if (!IsMode(TeleportRulesMode, comText)) return false;
        break;

      case MCCommandParameterType.tickingarea:
        if (!IsTickingArea(comText)) return false;
        break;

      case MCCommandParameterType.xp:
        if (!IsXpLevel(comText)) return false;
        break;
    }
  }

  return true;
}

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
import {
  CameraShakeMode,
  CloneMode,
  Difficulty,
  FillMode,
  LocateFeature,
  MaskMode,
  MirrorMode,
  MusicRepeatMode,
  OldBlockMode,
  OperationMode,
  ReplaceMode,
  RideFillMode,
  RideRulesMode,
  RotationMode,
  SaveMode,
  StructureAnimationMode,
  TeleportRulesMode,
} from "../Modes/include";
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
      return FillMode.ProvideCompletion(Context);

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
      return MaskMode.ProvideCompletion(Context);

    case MCCommandParameterType.mirror:
      return MirrorMode.ProvideCompletion(Context);

    case MCCommandParameterType.musicRepeatMode:
      return MusicRepeatMode.ProvideCompletion(Context);

    case MCCommandParameterType.oldBlockMode:
      return OldBlockMode.ProvideCompletion(Context);

    case MCCommandParameterType.objective:
      return Objectives.ProvideCompletion(Context);

    case MCCommandParameterType.operation:
      return OperationMode.ProvideCompletion(Context);

    case MCCommandParameterType.particle:
      return Particle.ProvideCompletion(Context);

    case MCCommandParameterType.replaceMode:
      return ReplaceMode.ProvideCompletion(Context);

    case MCCommandParameterType.rideRules:
      return RideRulesMode.ProvideCompletion(Context);

    case MCCommandParameterType.ridefillMode:
      return RideFillMode.ProvideCompletion(Context);

    case MCCommandParameterType.rotation:
      return RotationMode.ProvideCompletion(Context);

    case MCCommandParameterType.saveMode:
      return SaveMode.ProvideCompletion(Context);

    case MCCommandParameterType.selector:
      return Selector.Completion.ProvideCompletion(Context);

    case MCCommandParameterType.slotID:
      return Slot_id.ProvideCompletion(Context);

    case MCCommandParameterType.slotType:
      return Slot_type.ProvideCompletion(Context);

    case MCCommandParameterType.sound:
      return Sound.ProvideCompletion(Context);

    case MCCommandParameterType.string:
      Context.receiver.Add('""', "The start of a string", CompletionItemKind.Constant);
      return;

    case MCCommandParameterType.structureAnimationMode:
      return StructureAnimationMode.ProvideCompletion(Context);

    case MCCommandParameterType.tag:
      return Tag.ProvideCompletion(Context);

    case MCCommandParameterType.teleportRules:
      return TeleportRulesMode.ProvideCompletion(Context);

    case MCCommandParameterType.tickingarea:
      return Tickingarea.ProvideCompletion(Context);

    case MCCommandParameterType.xp:
      return Xp.ProvideCompletion(Context);

    default:
    case MCCommandParameterType.unknown:
      return;
  }
}

import { ParameterType } from "bc-minecraft-bedrock-command/lib/src/Lib/Types/include";
import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Commands/context";
import {
  Block,
  BlockStates,
  Boolean,
  Coordinate,
  Effect,
  Entity,
  EntityEvent,
  Float,
  Functions,
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
import { Modes } from "../../include";
import { ItemComponents, RawText } from "../../Json/include";
import { Command } from "../include";

function toCompletion(context: CommandCompletionContext): void {
  let Parameter = context.parameter;
  context.receiver.Add(Parameter.text, "keyword", CompletionItemKind.Keyword);
}

export function ProvideCompletion(context: CommandCompletionContext): void {
  let Parameter = context.parameter;

  //Check default option
  if (Parameter.options) {
    //Accepted values
    if (Parameter.options.acceptedValues) {
      Parameter.options.acceptedValues.forEach((value) => {
        context.receiver.Add(value, "accepted values", CompletionItemKind.Text);
      });
    }

    //Wildcard
    if (Parameter.options.wildcard) {
      context.receiver.Add("*", "wild card", CompletionItemKind.Constant);
    }
  }

  switch (Parameter.type) {
    case ParameterType.block:
      return Block.ProvideCompletion(context);

    case ParameterType.blockStates:
      return BlockStates.ProvideCompletion(context);

    case ParameterType.boolean:
      return Boolean.ProvideCompletion(context);

    case ParameterType.cameraShakeType:
      return Modes.CameraShake.ProvideCompletion(context);

    case ParameterType.cloneMode:
      return Modes.Clone.ProvideCompletion(context);

    case ParameterType.command:
      return Command.ProvideCompletion(context.receiver);

    case ParameterType.coordinate:
      return Coordinate.ProvideCompletion(context);

    case ParameterType.difficulty:
      return Modes.Difficulty.ProvideCompletion(context);

    case ParameterType.effect:
      return Effect.ProvideCompletion(context);

    case ParameterType.entity:
      return Entity.ProvideCompletion(context);

    case ParameterType.event:
      return EntityEvent.ProvideCompletion(context);

    case ParameterType.float:
      return Float.ProvideCompletion(context);

    case ParameterType.fillMode:
      return Modes.Fill.ProvideCompletion(context);

    case ParameterType.function:
      return Functions.ProvideCompletion(context);

    case ParameterType.gamemode:
      return Modes.Gamemode.ProvideCompletion(context);

    case ParameterType.integer:
      return Integer.ProvideCompletion(context);

    case ParameterType.item:
      return Item.ProvideCompletion(context);

    case ParameterType.jsonItem:
      return ItemComponents.ProvideCompletion(context.receiver);

    case ParameterType.jsonRawText:
      return RawText.ProvideCompletion(context.receiver);

    case ParameterType.keyword:
      return toCompletion(context);

    case ParameterType.locateFeature:
      return Modes.LocateFeature.ProvideCompletion(context);

    case ParameterType.maskMode:
      return Modes.Mask.ProvideCompletion(context);

    case ParameterType.mirror:
      return Modes.Mirror.ProvideCompletion(context);

    case ParameterType.musicRepeatMode:
      return Modes.MusicRepeat.ProvideCompletion(context);

    case ParameterType.oldBlockMode:
      return Modes.OldBlock.ProvideCompletion(context);

    case ParameterType.objective:
      return Objectives.ProvideCompletion(context);

    case ParameterType.operation:
      return Modes.Operation.ProvideCompletion(context);

    case ParameterType.particle:
      //TODO redo
      return undefined /*Particle.ProvideCompletion(context)*/;

    case ParameterType.replaceMode:
      return Modes.Replace.ProvideCompletion(context);

    case ParameterType.rideRules:
      return Modes.RideRules.ProvideCompletion(context);

    case ParameterType.ridefillMode:
      return Modes.RideFill.ProvideCompletion(context);

    case ParameterType.rotation:
      return Modes.Rotation.ProvideCompletion(context);

    case ParameterType.saveMode:
      return Modes.Save.ProvideCompletion(context);

    case ParameterType.selector:
      return Selector.Completion.ProvideCompletion(context);

    case ParameterType.slotID:
      return Slot_id.ProvideCompletion(context);

    case ParameterType.slotType:
      return Slot_type.ProvideCompletion(context);

    case ParameterType.sound:
      return Sound.ProvideCompletion(context);

    case ParameterType.string:
      context.receiver.Add('""', "The start of a string", CompletionItemKind.Constant);
      return;

    case ParameterType.structureAnimationMode:
      return Modes.StructureAnimation.ProvideCompletion(context);

    case ParameterType.tag:
      return Tag.ProvideCompletion(context);

    case ParameterType.teleportRules:
      return Modes.TeleportRules.ProvideCompletion(context);

    case ParameterType.tickingarea:
      return Tickingarea.ProvideCompletion(context);

    case ParameterType.xp:
      return Xp.ProvideCompletion(context);

    default:
    case ParameterType.unknown:
      return;
  }
}

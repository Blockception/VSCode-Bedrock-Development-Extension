import { ParameterType } from "bc-minecraft-bedrock-command/lib/src/Lib/Types/include";
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

function toCompletion(Context: CommandCompletionContext): void {
  let Parameter = Context.parameter;
  Context.receiver.Add(Parameter.text, "keyword", CompletionItemKind.Keyword);
}

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let Parameter = Context.parameter;

  //Check default option
  if (Parameter.options) {
    //Accepted values
    if (Parameter.options.acceptedValues) {
      Parameter.options.acceptedValues.forEach((value) => {
        Context.receiver.Add(value, "accepted values", CompletionItemKind.Text);
      });
    }

    //Wildcard
    if (Parameter.options.wildcard) {
      Context.receiver.Add("*", "wild card", CompletionItemKind.Constant);
    }
  }

  switch (Parameter.type) {
    case ParameterType.block:
      return Block.ProvideCompletion(Context);

    case ParameterType.blockStates:
      return BlockStates.ProvideCompletion(Context);

    case ParameterType.boolean:
      return Boolean.ProvideCompletion(Context);

    case ParameterType.cameraShakeType:
      return Modes.CameraShake.ProvideCompletion(Context);

    case ParameterType.cloneMode:
      return Modes.Clone.ProvideCompletion(Context);

    case ParameterType.command:
      return Command.ProvideCompletion(Context.receiver);

    case ParameterType.coordinate:
      return Coordinate.ProvideCompletion(Context);

    case ParameterType.difficulty:
      return Modes.Difficulty.ProvideCompletion(Context);

    case ParameterType.effect:
      return Effect.ProvideCompletion(Context);

    case ParameterType.entity:
      return Entity.ProvideCompletion(Context);

    case ParameterType.event:
      return Event.ProvideCompletion(Context);

    case ParameterType.float:
      return Float.ProvideCompletion(Context);

    case ParameterType.fillMode:
      return Modes.Fill.ProvideCompletion(Context);

    case ParameterType.function:
      return Functions.ProvideCompletion(Context);

    case ParameterType.gamemode:
      return Modes.Gamemode.ProvideCompletion(Context);

    case ParameterType.integer:
      return Integer.ProvideCompletion(Context);

    case ParameterType.item:
      return Item.ProvideCompletion(Context);

    case ParameterType.jsonItem:
      return ItemComponents.ProvideCompletion(Context.receiver);

    case ParameterType.jsonRawText:
      return RawText.ProvideCompletion(Context.receiver);

    case ParameterType.keyword:
      return toCompletion(Context);

    case ParameterType.locateFeature:
      return Modes.LocateFeature.ProvideCompletion(Context);

    case ParameterType.maskMode:
      return Modes.Mask.ProvideCompletion(Context);

    case ParameterType.mirror:
      return Modes.Mirror.ProvideCompletion(Context);

    case ParameterType.musicRepeatMode:
      return Modes.MusicRepeat.ProvideCompletion(Context);

    case ParameterType.oldBlockMode:
      return Modes.OldBlock.ProvideCompletion(Context);

    case ParameterType.objective:
      return Objectives.ProvideCompletion(Context);

    case ParameterType.operation:
      return Modes.Operation.ProvideCompletion(Context);

    case ParameterType.particle:
      //TODO redo
      return undefined /*Particle.ProvideCompletion(Context)*/;

    case ParameterType.replaceMode:
      return Modes.Replace.ProvideCompletion(Context);

    case ParameterType.rideRules:
      return Modes.RideRules.ProvideCompletion(Context);

    case ParameterType.ridefillMode:
      return Modes.RideFill.ProvideCompletion(Context);

    case ParameterType.rotation:
      return Modes.Rotation.ProvideCompletion(Context);

    case ParameterType.saveMode:
      return Modes.Save.ProvideCompletion(Context);

    case ParameterType.selector:
      return Selector.Completion.ProvideCompletion(Context);

    case ParameterType.slotID:
      return Slot_id.ProvideCompletion(Context);

    case ParameterType.slotType:
      return Slot_type.ProvideCompletion(Context);

    case ParameterType.sound:
      return Sound.ProvideCompletion(Context);

    case ParameterType.string:
      Context.receiver.Add('""', "The start of a string", CompletionItemKind.Constant);
      return;

    case ParameterType.structureAnimationMode:
      return Modes.StructureAnimation.ProvideCompletion(Context);

    case ParameterType.tag:
      return Tag.ProvideCompletion(Context);

    case ParameterType.teleportRules:
      return Modes.TeleportRules.ProvideCompletion(Context);

    case ParameterType.tickingarea:
      return Tickingarea.ProvideCompletion(Context);

    case ParameterType.xp:
      return Xp.ProvideCompletion(Context);

    default:
    case ParameterType.unknown:
      return;
  }
}

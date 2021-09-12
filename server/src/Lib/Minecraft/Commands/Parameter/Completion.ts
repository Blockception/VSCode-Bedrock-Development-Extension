import { ParameterType } from "bc-minecraft-bedrock-command/lib/src/Lib/Types/include";
import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";

function toCompletion(Context: CommandCompletionContext): void {
  let Parameter = Context.Parameter;
  Context.receiver.Add(Parameter.Text, "keyword", CompletionItemKind.Keyword);
}

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let Parameter = Context.Parameter;

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
      return CameraShakeMode.ProvideCompletion(Context);

    case ParameterType.cloneMode:
      return CloneMode.ProvideCompletion(Context);

    case ParameterType.command:
      return Command.ProvideCompletion(Context.receiver);

    case ParameterType.coordinate:
      return Coordinate.ProvideCompletion(Context);

    case ParameterType.difficulty:
      return Difficulty.ProvideCompletion(Context);

    case ParameterType.effect:
      return Effect.ProvideCompletion(Context);

    case ParameterType.entity:
      return Entity.ProvideCompletion(Context);

    case ParameterType.event:
      return Event.ProvideCompletion(Context);

    case ParameterType.float:
      return Float.ProvideCompletion(Context);

    case ParameterType.fillMode:
      return FillMode.ProvideCompletion(Context);

    case ParameterType.function:
      return Functions.ProvideCompletion(Context);

    case ParameterType.gamemode:
      return Gamemode.ProvideCompletion(Context);

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
      return LocateFeature.ProvideCompletion(Context);

    case ParameterType.maskMode:
      return MaskMode.ProvideCompletion(Context);

    case ParameterType.mirror:
      return MirrorMode.ProvideCompletion(Context);

    case ParameterType.musicRepeatMode:
      return MusicRepeatMode.ProvideCompletion(Context);

    case ParameterType.oldBlockMode:
      return OldBlockMode.ProvideCompletion(Context);

    case ParameterType.objective:
      return Objectives.ProvideCompletion(Context);

    case ParameterType.operation:
      return OperationMode.ProvideCompletion(Context);

    case ParameterType.particle:
      return Particle.ProvideCompletion(Context);

    case ParameterType.replaceMode:
      return ReplaceMode.ProvideCompletion(Context);

    case ParameterType.rideRules:
      return RideRulesMode.ProvideCompletion(Context);

    case ParameterType.ridefillMode:
      return RideFillMode.ProvideCompletion(Context);

    case ParameterType.rotation:
      return RotationMode.ProvideCompletion(Context);

    case ParameterType.saveMode:
      return SaveMode.ProvideCompletion(Context);

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
      return StructureAnimationMode.ProvideCompletion(Context);

    case ParameterType.tag:
      return Tag.ProvideCompletion(Context);

    case ParameterType.teleportRules:
      return TeleportRulesMode.ProvideCompletion(Context);

    case ParameterType.tickingarea:
      return Tickingarea.ProvideCompletion(Context);

    case ParameterType.xp:
      return Xp.ProvideCompletion(Context);

    default:
    case ParameterType.unknown:
      return;
  }
}

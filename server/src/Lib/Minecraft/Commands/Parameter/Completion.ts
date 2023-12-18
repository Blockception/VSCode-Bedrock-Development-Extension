import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";
import { ParameterType, ParameterTypeDocumentation } from "bc-minecraft-bedrock-command";

/**These are here to stop circular dependency */
import * as Command from "../../Commands/Command";
import * as General from "../../General/Completion";
import * as Json from "../../Json";
import * as Modes from "../../Modes";
import * as ResourcePack from "../../ResourcePack";
import * as BehaviorPack from "../../BehaviorPack";

export function provideCompletion(context: CommandCompletionContext): void {
  const parameter = context.parameter;

  //Check default option
  if (parameter.options) {
    //Accepted values
    if (parameter.options.acceptedValues) {
      parameter.options.acceptedValues.forEach((value) => {
        context.receiver.Add(value, "accepted values", CompletionItemKind.EnumMember);
      });
    }

    //Wildcard
    if (parameter.options.wildcard) {
      context.receiver.Add("*", "wild card", CompletionItemKind.Constant);
    }
  }

  //Adding explanation text
  const old = context.receiver.OnNewItem;

  context.receiver.OnNewItem = (item) => {
    const doc = ParameterTypeDocumentation[context.parameter.type];

    if (doc) {
      if (typeof item.documentation === "string" || item.documentation === undefined) {
        item.documentation = {
          kind: "markdown",
          value: item.documentation ?? "",
        };
      }

      item.documentation.value += "\n" + doc;
    }

    if (old) old(item);
  };

  const call = DataMap[context.parameter.type];
  if (call) call(context);

  context.receiver.OnNewItem = old;
}

function toCompletion(context: CommandCompletionContext): void {
  context.receiver.Add(context.parameter.text, "The keyword: " + context.parameter.text, CompletionItemKind.Keyword);
}

type functionCall =
  | ((context: SimpleContext<CompletionBuilder>) => void)
  | ((context: CommandCompletionContext) => void)
  | undefined;

const DataMap: Record<number, functionCall> = {
  //BehaviorPacks
  [ParameterType.block]: BehaviorPack.Block.provideCompletion,
  [ParameterType.blockStates]: BehaviorPack.BlockStates.provideCompletion,
  [ParameterType.entity]: BehaviorPack.Entities.provideCompletion,
  [ParameterType.event]: BehaviorPack.EntityEvent.provideCompletion,
  [ParameterType.function]: BehaviorPack.Functions.provideCompletion,
  [ParameterType.item]: BehaviorPack.Items.provideCompletion,
  [ParameterType.lootTable]: BehaviorPack.LootTables.provideShortCompletion,
  [ParameterType.structure]: BehaviorPack.Structures.provideCompletion,
  //ResourcePacks
  [ParameterType.animation]: ResourcePack.Animations.provideCompletion,
  [ParameterType.particle]: ResourcePack.Particles.provideCompletion,
  [ParameterType.sound]: ResourcePack.Sounds.provideCompletion,
  //General
  [ParameterType.boolean]: General.Boolean.provideCompletion,
  [ParameterType.coordinate]: General.Coordinate.provideCompletion,
  [ParameterType.float]: General.Float.provideCompletion,
  [ParameterType.integer]: General.Integer.provideCompletion,
  [ParameterType.integer_range]: General.Integer.provideRangeCompletion,
  //Json
  [ParameterType.jsonItem]: Json.ItemComponents.provideCompletion,
  [ParameterType.jsonRawText]: Json.RawText.provideCompletion,
  //Modes
  [ParameterType.cameraShakeType]: Modes.CameraShake.provideCompletion,
  [ParameterType.causeType]: Modes.CauseType.provideCompletion,
  [ParameterType.cloneMode]: Modes.Clone.provideCompletion,
  [ParameterType.difficulty]: Modes.Difficulty.provideCompletion,
  [ParameterType.dimension]: Modes.Dimension.provideCompletion,
  [ParameterType.fillMode]: Modes.Fill.provideCompletion,
  [ParameterType.gamemode]: Modes.Gamemode.provideCompletion,
  [ParameterType.handType]: Modes.HandType.provideCompletion,
  [ParameterType.locateFeature]: Modes.LocateFeature.provideCompletion,
  [ParameterType.maskMode]: Modes.Mask.provideCompletion,
  [ParameterType.mirror]: Modes.Mirror.provideCompletion,
  [ParameterType.musicRepeatMode]: Modes.MusicRepeat.provideCompletion,
  [ParameterType.oldBlockMode]: Modes.OldBlock.provideCompletion,
  [ParameterType.operation]: Modes.Operation.provideCompletion,
  [ParameterType.permission]: Modes.Permission.provideCompletion,
  [ParameterType.permissionState]: Modes.PermissionState.provideCompletion,
  [ParameterType.replaceMode]: Modes.Replace.provideCompletion,
  [ParameterType.ridefillMode]: Modes.RideFill.provideCompletion,
  [ParameterType.rideRules]: Modes.RideRules.provideCompletion,
  [ParameterType.rotation]: Modes.Rotation.provideCompletion,
  [ParameterType.saveMode]: Modes.Save.provideCompletion,
  [ParameterType.scanMode]: Modes.ScanMode.provideCompletion,
  [ParameterType.slotID]: Modes.SlotId.provideCompletion,
  [ParameterType.slotType]: Modes.SlotType.provideCompletion,
  [ParameterType.structureAnimationMode]: Modes.StructureAnimation.provideCompletion,
  [ParameterType.teleportRules]: Modes.TeleportRules.provideCompletion,
  [ParameterType.time]: Modes.Time.provideCompletion,
  //Commands
  [ParameterType.command]: Command.provideCompletion,
  [ParameterType.keyword]: toCompletion,
  [ParameterType.effect]: General.Effect.provideCompletion,
  [ParameterType.executeSubcommand]: Command.provideExecuteSubcommandCompletion,
  [ParameterType.message]: General.String.provideCompletion,
  [ParameterType.objective]: General.Objectives.provideCompletion,
  [ParameterType.selector]: General.Selector.provideCompletion,
  [ParameterType.string]: General.String.provideCompletion,
  [ParameterType.tag]: General.Tag.provideCompletion,
  [ParameterType.tickingarea]: General.Tickingarea.provideCompletion,
  [ParameterType.xp]: General.Xp.provideCompletion,
};

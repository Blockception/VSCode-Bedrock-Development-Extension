import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { CommandCompletionContext } from "../../builder/context";
import { ParameterType, ParameterTypeDocumentation } from "bc-minecraft-bedrock-command";
import { Modes } from "bc-minecraft-bedrock-types";

/**These are here to stop circular dependency */
import * as Command from "./commands";
import * as General from "../../general";
import * as Selectors from "../selectors/selector";
import * as ItemComponents from "../json/item-components";
import * as RawText from "../json/rawtext";
import * as ResourcePack from "../resource-pack";
import * as BehaviorPack from "../behavior-pack";
import * as ModeCompletions from "../modes/modes";
import * as SlotId from "../modes/slot-id";

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
  const cancelFn = context.receiver.OnNewItem((item, next) => {
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

    next(item);
  });

  const call = DataMap[context.parameter.type];
  if (call) call(context);

  cancelFn();
}

function toCompletion(context: CommandCompletionContext): void {
  context.receiver.Add(context.parameter.text, "The keyword: " + context.parameter.text, CompletionItemKind.Keyword);
}

type functionCall =
  | ((context: SimpleContext<CompletionBuilder>) => void)
  | ((context: CommandCompletionContext) => void)
  | undefined;

function modeCompletion(mode: string): functionCall {
  return (context: SimpleContext<CompletionBuilder>) => {
    return ModeCompletions.provideCompletion(mode, context);
  };
}

const DataMap: Record<number, functionCall> = {
  //BehaviorPacks
  [ParameterType.block]: BehaviorPack.Blocks.provideCompletion,
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
  [ParameterType.jsonItem]: ItemComponents.provideCompletion,
  [ParameterType.jsonRawText]: RawText.provideCompletion,
  //Modes
  [ParameterType.cameraShakeType]: modeCompletion(Modes.CameraShake.name),
  [ParameterType.causeType]: modeCompletion(Modes.CauseType.name),
  [ParameterType.cloneMode]: modeCompletion(Modes.Clone.name),
  [ParameterType.difficulty]: modeCompletion(Modes.Difficulty.name),
  [ParameterType.dimension]: modeCompletion(Modes.Dimension.name),
  [ParameterType.fillMode]: modeCompletion(Modes.Fill.name),
  [ParameterType.gamemode]: modeCompletion(Modes.Gamemode.name),
  [ParameterType.handType]: modeCompletion(Modes.HandType.name),
  [ParameterType.locateFeature]: modeCompletion(Modes.LocateFeature.name),
  [ParameterType.maskMode]: modeCompletion(Modes.Mask.name),
  [ParameterType.mirror]: modeCompletion(Modes.Mirror.name),
  [ParameterType.musicRepeatMode]: modeCompletion(Modes.MusicRepeat.name),
  [ParameterType.oldBlockMode]: modeCompletion(Modes.OldBlock.name),
  [ParameterType.operation]: modeCompletion(Modes.Operation.name),
  [ParameterType.permission]: modeCompletion(Modes.Permission.name),
  [ParameterType.permissionState]: modeCompletion(Modes.PermissionState.name),
  [ParameterType.replaceMode]: modeCompletion(Modes.Replace.name),
  [ParameterType.ridefillMode]: modeCompletion(Modes.RideFill.name),
  [ParameterType.rideRules]: modeCompletion(Modes.RideRules.name),
  [ParameterType.rotation]: modeCompletion(Modes.Rotation.name),
  [ParameterType.saveMode]: modeCompletion(Modes.Save.name),
  [ParameterType.scanMode]: modeCompletion(Modes.Scan.name),
  [ParameterType.slotID]: SlotId.provideCompletion,
  [ParameterType.slotType]: modeCompletion(Modes.SlotType.name),
  [ParameterType.structureAnimationMode]: modeCompletion(Modes.StructureAnimation.name),
  [ParameterType.teleportRules]: modeCompletion(Modes.TeleportRules.name),
  [ParameterType.time]: modeCompletion(Modes.Time.name),
  //Commands
  [ParameterType.command]: Command.provideCompletion,
  [ParameterType.keyword]: toCompletion,
  [ParameterType.effect]: General.Effect.provideCompletion,
  [ParameterType.executeSubcommand]: Command.provideExecuteSubcommandCompletion,
  [ParameterType.message]: General.Strings.provideCompletion,
  [ParameterType.objective]: General.Objectives.provideCompletion,
  [ParameterType.selector]: Selectors.provideCompletion,
  [ParameterType.string]: General.Strings.provideCompletion,
  [ParameterType.tag]: General.Tags.provideCompletion,
  [ParameterType.tickingarea]: General.Tickingareas.provideCompletion,
  [ParameterType.xp]: General.Xp.provideCompletion,
};

import { Modes } from "bc-minecraft-bedrock-types";
import { SlotTypeMode } from "bc-minecraft-bedrock-types/lib/src/Modes/SlotType";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { General } from "../../include";

export function ProvideCompletion(context: CommandCompletionContext): void {
  const command = context.command;
  const Index = context.parameterIndex;

  if (Index < 0) return;

  const SlotType = command.parameters[Index - 1].text;
  let Mode = <SlotTypeMode>Modes.SlotType.get(SlotType);

  if (Mode && Modes.SlotType.isValue(Mode.name)) {
    if (Mode.range) {
      General.Integer.ProvideCreateCompletion(context.receiver, Mode.range.min, Mode.range.max);
    } else {
      General.Integer.ProvideCreateCompletion(context.receiver, 0, 9);
    }
  }
}

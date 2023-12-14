import { Modes } from "bc-minecraft-bedrock-types";
import { SlotTypeMode } from "bc-minecraft-bedrock-types/lib/src/Modes/SlotType";
import { CommandCompletionContext } from "../../../Completion/Context";
import * as Integer from '../../General/Integer/Completion';

export function provideCompletion(context: CommandCompletionContext): void {
  const command = context.command;
  const Index = context.parameterIndex;

  if (Index < 0) return;

  const SlotType = command.parameters[Index - 1].text;
  const Mode = <SlotTypeMode>Modes.SlotType.get(SlotType);

  if (Mode && Modes.SlotType.isValue(Mode.name)) {
    if (Mode.range) {
      Integer.provideCreateCompletion(context.receiver, Mode.range.min, Mode.range.max);
    } else {
      Integer.provideCreateCompletion(context.receiver, 0, 9);
    }
  }
}

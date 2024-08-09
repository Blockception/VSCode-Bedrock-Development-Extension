import { Modes } from "bc-minecraft-bedrock-types";
import { SlotTypeMode } from "bc-minecraft-bedrock-types/lib/src/modes/slot-type";
import { CommandCompletionContext } from '../../context';

import * as Integer from '../../general/integer';

export function provideCompletion(context: CommandCompletionContext): void {
  const command = context.command;
  const Index = context.parameterIndex;

  if (Index < 0) return;

  const SlotType = command.parameters[Index - 1].text;
  const Mode = <SlotTypeMode>Modes.SlotType.get(SlotType);

  if (Mode && Modes.SlotType.isValue(Mode.name)) {
    if (Mode.range) {
      Integer.provideCreateCompletion(context.builder, Mode.range.min, Mode.range.max);
    } else {
      Integer.provideCreateCompletion(context.builder, 0, 9);
    }
  }
}

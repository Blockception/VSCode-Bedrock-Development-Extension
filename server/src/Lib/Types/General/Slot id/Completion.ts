import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { GetMode } from "../../Commands/Modes/include";
import { Integer } from "../include";
import { SlotTypeMode, SlotTypeModes } from "../Slot type/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let Command = Context.Command;
  let word = Context.Current;

  if (!word) return;
  let Index = Command.Parameters.indexOf(word);

  if (Index < 0) return;

  const SlotType = Command.Parameters[Index - 1].text;
  let Mode = GetMode(SlotTypeModes, SlotType);

  if (SlotTypeMode.is(Mode)) {
    if (Mode.range) {
      Integer.ProvideCreateCompletion(Context.receiver, Mode.range.min, Mode.range.max);
    } else {
      Integer.ProvideCreateCompletion(Context.receiver, 0, 9);
    }
  }
}

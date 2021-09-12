import { Modes } from "bc-minecraft-bedrock-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Integer } from "../include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let Command = Context.Command;
  let word = Context.Current;

  if (!word) return;
  let Index = command.parameters.indexOf(word.text);

  if (Index < 0) return;

  const SlotType = command.parameters[Index - 1].text;
  let Mode = <SlotTypeMode>Modes.SlotType.get(SlotType);

  if (Mode && Modes.SlotType.isValue(Mode.name)) {
    if (Mode.range) {
      Integer.ProvideCreateCompletion(Context.receiver, Mode.range.min, Mode.range.max);
    } else {
      Integer.ProvideCreateCompletion(Context.receiver, 0, 9);
    }
  }
}

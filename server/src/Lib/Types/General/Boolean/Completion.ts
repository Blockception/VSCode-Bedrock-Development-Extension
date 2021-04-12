import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  //False
  Context.receiver.Add("false", "The boolean value for false", Kinds.Completion.Boolean);

  //true
  Context.receiver.Add("true", "The boolean value for true", Kinds.Completion.Boolean);
}

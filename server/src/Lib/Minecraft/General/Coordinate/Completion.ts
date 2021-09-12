import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;
  const Kind = Kinds.Completion.Coordinate;

  receiver.Add("~", "Relative coordinate", Kind).preselect = true;
  receiver.Add("~1", "Relative coordinate", Kind);
  receiver.Add("~-1", "Relative coordinate", Kind);
  receiver.Add("^1", "Local coordinate", Kind);
  receiver.Add("^", "Local coordinate", Kind);
  receiver.Add("^-1", "Local coordinate", Kind);
  receiver.Add("1", "Coordinate", Kind);
  receiver.Add("-1", "Coordinate", Kind);
}

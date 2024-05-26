import { CommandCompletionContext } from "../../../Completion/Context";
import { Kinds } from "../Kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
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

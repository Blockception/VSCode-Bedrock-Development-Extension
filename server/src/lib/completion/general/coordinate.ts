import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Kind = Kinds.Completion.Coordinate;

  receiver.add("~", "Relative coordinate", Kind).preselect = true;
  receiver.add("~1", "Relative coordinate", Kind);
  receiver.add("~-1", "Relative coordinate", Kind);
  receiver.add("^1", "Local coordinate", Kind);
  receiver.add("^", "Local coordinate", Kind);
  receiver.add("^-1", "Local coordinate", Kind);
  receiver.add("1", "Coordinate", Kind);
  receiver.add("-1", "Coordinate", Kind);
}

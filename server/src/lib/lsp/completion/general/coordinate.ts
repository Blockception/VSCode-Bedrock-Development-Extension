import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.Coordinate });

  receiver.add({ label: "~", documentation: "Relative coordinate" }).preselect = true;
  receiver.add({ label: "~1", documentation: "Relative coordinate" });
  receiver.add({ label: "~-1", documentation: "Relative coordinate" });
  receiver.add({ label: "^1", documentation: "Local coordinate" });
  receiver.add({ label: "^", documentation: "Local coordinate" });
  receiver.add({ label: "^-1", documentation: "Local coordinate" });
  receiver.add({ label: "1", documentation: "Coordinate" });
  receiver.add({ label: "-1", documentation: "Coordinate" });
}

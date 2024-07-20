import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Coordinate });

  builder.add({ label: "~", documentation: "Relative coordinate" }).preselect = true;
  builder.add({ label: "~1", documentation: "Relative coordinate" });
  builder.add({ label: "~-1", documentation: "Relative coordinate" });
  builder.add({ label: "^1", documentation: "Local coordinate" });
  builder.add({ label: "^", documentation: "Local coordinate" });
  builder.add({ label: "^-1", documentation: "Local coordinate" });
  builder.add({ label: "1", documentation: "Coordinate" });
  builder.add({ label: "-1", documentation: "Coordinate" });
}

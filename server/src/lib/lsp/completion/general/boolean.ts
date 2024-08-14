import { Kinds } from "../../../constants";
import { CommandCompletionContext } from "../context";

export function provideCompletion(context: Pick<CommandCompletionContext, "builder">): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Boolean });

  builder.add({ label: "false", documentation: "The boolean value for `false`" });
  builder.add({ label: "true", documentation: "The boolean value for `true`" });
}

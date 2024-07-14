import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: Pick<CommandCompletionContext, "receiver">): void {
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.Boolean });

  receiver.add({ label: "false", documentation: "The boolean value for `false`" });
  receiver.add({ label: "true", documentation: "The boolean value for `true`" });
}

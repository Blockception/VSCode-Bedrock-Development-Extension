import { CompletionBuilder } from "../builder/builder";
import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: CommandCompletionContext | CompletionBuilder): void {
  let receiver = CommandCompletionContext.is(context) ? context.receiver : context;

  //False
  receiver.add({label:"false", documentation: "The boolean value for `false`", kind: Kinds.Completion.Boolean});

  //True
  receiver.add({label:"true", documentation: "The boolean value for `true`", kind: Kinds.Completion.Boolean});
}

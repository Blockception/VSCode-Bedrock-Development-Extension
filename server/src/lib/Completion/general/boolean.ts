import { CompletionBuilder } from "../builder/builder";
import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: CommandCompletionContext | CompletionBuilder): void {
  let receiver = CommandCompletionContext.is(context) ? context.receiver : context;

  //False
  receiver.Add("false", "The boolean value for `false`", Kinds.Completion.Boolean);

  //True
  receiver.Add("true", "The boolean value for `true`", Kinds.Completion.Boolean);
}

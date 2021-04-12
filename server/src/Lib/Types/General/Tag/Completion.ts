import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { CompletionBuilder } from "../../../Completion/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  receiver.AddFromRange(Database.Data.General.Tag, Kinds.Completion.Tag);
}

export function ProvideCompletionTest(Context: CommandCompletionContext | CompletionBuilder): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  Database.Data.General.Tag.ForEach((tag) => {
    receiver.Add(tag.Identifier, `Tests for the tag: '${tag.Identifier}'`, Kinds.Completion.Tag);
    receiver.Add("!" + tag.Identifier, `Tests not for the tag: '${tag.Identifier}'`, Kinds.Completion.Tag);
  });
}

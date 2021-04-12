import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  receiver.AddFromRange(Database.Data.General.Objectives, Kinds.Completion.Objectives);
}

export function ProvideCompletionPost(Context: CommandCompletionContext | CompletionBuilder, additionalText: string): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  Database.Data.General.Objectives.ForEach((objective) => {
    let Name = objective.Identifier;

    receiver.Add(Name, objective.Documentation, Kinds.Completion.Objectives, Name + additionalText);
  });
}

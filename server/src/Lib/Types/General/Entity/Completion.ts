import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { CompletionBuilder } from "../../../Completion/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  receiver.AddFromRange(Database.Data.General.Entities, Kinds.Completion.Entity);
}

export function ProvideCompletionTest(Context: CommandCompletionContext | CompletionBuilder): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  Database.Data.General.Entities.ForEach((entity) => {
    let Name = entity.Identifier;

    receiver.Add(Name, "test for the entity: " + Name, Kinds.Completion.Entity);
    receiver.Add("!" + Name, "test not for the entity: " + Name, Kinds.Completion.Entity);
  });
}

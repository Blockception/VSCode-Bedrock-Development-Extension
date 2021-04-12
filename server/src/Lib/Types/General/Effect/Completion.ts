import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  receiver.AddFromRange(Database.Data.General.Effects, Kinds.Completion.Effect);
}

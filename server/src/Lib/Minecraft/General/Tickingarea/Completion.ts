import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  //TODO receiver.AddFromRange(Database.ProjectData.General.TickingAreas, Kinds.Completion.Tickingarea);
}

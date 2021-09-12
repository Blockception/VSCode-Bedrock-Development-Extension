import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;

  //TODO receiver.AddFromRange(Database.ProjectData.General.TickingAreas, Kinds.Completion.Tickingarea);
}

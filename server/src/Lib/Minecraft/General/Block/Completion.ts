import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  Context.receiver.AddFromRange(Database.ProjectData.General.Blocks, Kinds.Completion.Block);
}

import { CommandCompletionContext } from "../../../../Completion/Commands/include";
import { Database } from "../../../../Database/include";
import { Kinds } from "../../../General/Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  receiver.AddFromRange(Database.ProjectData.Resourcepack.Particles, Kinds.Completion.Particle);
}

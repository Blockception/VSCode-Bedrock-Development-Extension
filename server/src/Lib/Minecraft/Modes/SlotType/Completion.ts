import { Modes } from "bc-minecraft-bedrock-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { ProvideModeCompletion } from "../Completion";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;

  ProvideModeCompletion(Modes.SlotType, receiver, Kinds.Completion.Gamemode);
}

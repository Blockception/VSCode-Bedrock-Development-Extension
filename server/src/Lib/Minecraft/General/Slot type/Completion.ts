import { Modes } from "bc-minecraft-bedrock-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { ProvideModeCompletion } from "../../../Minecraft/Modes/Completion";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  ProvideModeCompletion(Modes.SlotType, receiver, Kinds.Completion.Gamemode);
}

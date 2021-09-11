import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { ProvideModeCompletion } from "../../../Minecraft/Modes/Completion";
import { Kinds } from "../Kinds";
import { SlotTypeModes } from "./Slot type";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  ProvideModeCompletion(SlotTypeModes, receiver, Kinds.Completion.Gamemode);
}

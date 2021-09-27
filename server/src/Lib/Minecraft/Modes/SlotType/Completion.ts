import { Modes } from "bc-minecraft-bedrock-types";
import { ProvideModeCompletion } from "../Completion";
import { Kinds } from "../../General/Kinds";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  ProvideModeCompletion(Modes.SlotType, context, Kinds.Completion.Gamemode);
}

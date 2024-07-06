import { Modes } from "bc-minecraft-bedrock-types";
import { provideModeCompletion } from "../Completion";
import { Kinds } from "../../General/Kinds";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

/**
 *
 * @param context
 */
export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  provideModeCompletion(Modes.SlotType, context, Kinds.Completion.Gamemode);
}

import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Context";
import { ProvideModeCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: CommandCompletionContext): void {
  ProvideModeCompletion(Modes.Mask, context.receiver, CompletionItemKind.Operator);
}

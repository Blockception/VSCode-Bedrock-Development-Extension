import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Context";
import { provideModeCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function provideCompletion(context: CommandCompletionContext): void {
  provideModeCompletion(Modes.Time, context, CompletionItemKind.Constant);
}

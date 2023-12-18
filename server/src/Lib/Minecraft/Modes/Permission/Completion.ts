import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { provideModeCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  provideModeCompletion(Modes.Permission, context, CompletionItemKind.Operator);
}

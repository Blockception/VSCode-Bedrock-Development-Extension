import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { ProvideModeCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  ProvideModeCompletion(Modes.Difficulty, context, CompletionItemKind.Operator);
}

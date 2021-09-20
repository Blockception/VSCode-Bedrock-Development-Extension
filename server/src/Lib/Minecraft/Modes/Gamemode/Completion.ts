import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Kinds } from "../../General/include";
import { ProvideModeCompletion, ProvideModeTestCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  ProvideModeCompletion(Modes.Gamemode, context, CompletionItemKind.Operator);
}

/**
 *
 * @param context
 */
export function ProvideCompletionTest(context: SimpleContext<CompletionBuilder>): void {
  ProvideModeTestCompletion(Modes.Gamemode, context, Kinds.Completion.Gamemode);
}

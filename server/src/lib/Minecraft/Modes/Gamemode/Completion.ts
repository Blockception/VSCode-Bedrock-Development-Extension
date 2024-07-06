import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Kinds } from "../../General/Kinds";
import { provideModeCompletion, provideModeTestCompletion } from "../Completion";

/**
 *
 * @param context
 */
export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  provideModeCompletion(Modes.Gamemode, context, CompletionItemKind.Operator);
}

/**
 *
 * @param context
 */
export function provideCompletionTest(context: SimpleContext<CompletionBuilder>): void {
  provideModeTestCompletion(Modes.Gamemode, context, Kinds.Completion.Gamemode);
}

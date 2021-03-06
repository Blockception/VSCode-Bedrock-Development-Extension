import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { DifficultyMode } from "./Difficulty";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(DifficultyMode, Context.receiver, CompletionItemKind.Operator);
}

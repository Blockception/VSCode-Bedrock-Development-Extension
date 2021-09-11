import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { ReplaceMode } from "./ReplaceMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(ReplaceMode, Context.receiver, CompletionItemKind.Operator);
}

import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { CloneMode } from "./CloneMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(CloneMode, Context.receiver, CompletionItemKind.Operator);
}

import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { FillMode } from "./FillMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(FillMode, Context.receiver, CompletionItemKind.Operator);
}

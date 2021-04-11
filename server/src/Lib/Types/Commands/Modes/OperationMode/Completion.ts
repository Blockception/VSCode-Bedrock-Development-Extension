import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { OperationModes } from "./Operation";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(OperationModes, Context.receiver, CompletionItemKind.Operator);
}

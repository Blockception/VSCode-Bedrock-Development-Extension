import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { RotationMode } from "./RotationMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(RotationMode, Context.receiver, CompletionItemKind.Operator);
}

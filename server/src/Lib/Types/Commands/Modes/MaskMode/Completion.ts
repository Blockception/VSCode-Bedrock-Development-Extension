import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { MaskMode } from "./MaskMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(MaskMode, Context.receiver, CompletionItemKind.Operator);
}

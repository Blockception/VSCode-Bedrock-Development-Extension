import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { RideFillMode } from "./RideFillMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(RideFillMode, Context.receiver, CompletionItemKind.Operator);
}

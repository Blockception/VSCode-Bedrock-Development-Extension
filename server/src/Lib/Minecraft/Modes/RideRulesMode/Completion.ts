import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { RideRulesMode } from "./RideRulesMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(RideRulesMode, Context.receiver, CompletionItemKind.Operator);
}

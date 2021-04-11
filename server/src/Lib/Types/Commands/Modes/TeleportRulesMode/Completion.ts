import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { TeleportRulesMode } from "./TeleportRulesMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(TeleportRulesMode, Context.receiver, CompletionItemKind.Operator);
}

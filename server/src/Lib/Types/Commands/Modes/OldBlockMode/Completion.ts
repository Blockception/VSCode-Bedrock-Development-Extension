import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { OldBlockModeModes } from "./include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(OldBlockModeModes, Context.receiver, CompletionItemKind.Operator);
}

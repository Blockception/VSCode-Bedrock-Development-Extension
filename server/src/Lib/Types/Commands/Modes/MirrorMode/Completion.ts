import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { MirrorMode } from "./MirrorMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(MirrorMode, Context.receiver, CompletionItemKind.Operator);
}

import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { MusicRepeatMode } from "./MusicRepeatMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(MusicRepeatMode, Context.receiver, CompletionItemKind.Operator);
}

import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { GameMode } from "./Gamemode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(GameMode, Context.receiver, CompletionItemKind.Operator);
}

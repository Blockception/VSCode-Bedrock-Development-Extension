import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { CameraShakeModes } from "./CameraShake";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(CameraShakeModes, Context.receiver, CompletionItemKind.Operator);
}

import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { LocateFeatureMode } from "./LocateFeature";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(LocateFeatureMode, Context.receiver, CompletionItemKind.Operator);
}

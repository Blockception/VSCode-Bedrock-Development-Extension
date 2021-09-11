import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";
import { StructureAnimationMode } from "./StructureAnimationMode";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(StructureAnimationMode, Context.receiver, CompletionItemKind.Operator);
}

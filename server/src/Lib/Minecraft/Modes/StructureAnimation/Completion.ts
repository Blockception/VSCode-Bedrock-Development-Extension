import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { ProvideModeCompletion } from "../Completion";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  ProvideModeCompletion(Modes.StructureAnimation, Context.receiver, CompletionItemKind.Operator);
}

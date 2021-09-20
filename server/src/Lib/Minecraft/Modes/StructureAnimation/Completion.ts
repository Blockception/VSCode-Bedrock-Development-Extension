import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Context";
import { ProvideModeCompletion } from "../Completion";

export function ProvideCompletion(context: CommandCompletionContext): void {
  ProvideModeCompletion(Modes.StructureAnimation, context, CompletionItemKind.Operator);
}

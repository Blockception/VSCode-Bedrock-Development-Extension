import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/context";
import { ProvideModeCompletion } from "../Completion";

export function ProvideCompletion(context: CommandCompletionContext): void {
  ProvideModeCompletion(Modes.StructureAnimation, context.receiver, CompletionItemKind.Operator);
}

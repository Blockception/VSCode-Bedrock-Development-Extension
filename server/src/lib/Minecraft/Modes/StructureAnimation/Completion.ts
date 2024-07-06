import { Modes } from "bc-minecraft-bedrock-types";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Context";
import { provideModeCompletion } from "../Completion";

export function provideCompletion(context: CommandCompletionContext): void {
  provideModeCompletion(Modes.StructureAnimation, context, CompletionItemKind.Operator);
}

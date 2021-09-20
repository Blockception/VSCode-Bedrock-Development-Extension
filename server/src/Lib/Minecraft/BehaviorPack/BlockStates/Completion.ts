import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(context: CommandCompletionContext): void {
  context.receiver.Add("[]", "Block states", CompletionItemKind.Snippet);
}

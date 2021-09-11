import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  Context.receiver.Add("[]", "Block states", CompletionItemKind.Snippet);
}

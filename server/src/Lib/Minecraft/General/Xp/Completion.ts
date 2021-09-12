import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;

  receiver.Add("1L", "Add 1 level of xp", CompletionItemKind.Value);
  receiver.Add("-1L", "Remove 1 level of xp", CompletionItemKind.Value);
  receiver.Add("-1000L", "Removes 1000 xp levels", CompletionItemKind.Value);
}

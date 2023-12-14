import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  receiver.Add("1L", "Add 1 level of xp", CompletionItemKind.Value);
  receiver.Add("-1L", "Remove 1 level of xp", CompletionItemKind.Value);
  receiver.Add("-1000L", "Removes 1000 xp levels", CompletionItemKind.Value);
}

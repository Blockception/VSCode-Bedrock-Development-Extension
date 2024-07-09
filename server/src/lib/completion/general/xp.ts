import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../Code/SimpleContext";
import { CompletionBuilder } from "../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  receiver.add("1L", "Add 1 level of xp", CompletionItemKind.Value);
  receiver.add("-1L", "Remove 1 level of xp", CompletionItemKind.Value);
  receiver.add("-1000L", "Removes 1000 xp levels", CompletionItemKind.Value);
}

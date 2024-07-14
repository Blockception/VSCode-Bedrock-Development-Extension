import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../Code/SimpleContext";
import { CompletionBuilder } from "../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;

  receiver.add({ label:"1L", documentation: "Add 1 level of xp", kind: CompletionItemKind.Value});
  receiver.add({ label:"-1L", documentation: "Remove 1 level of xp", kind: CompletionItemKind.Value});
  receiver.add({ label:"-1000L", documentation: "Removes 1000 xp levels", kind: CompletionItemKind.Value});
}

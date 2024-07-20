import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../util/simple-context";
import { CompletionBuilder } from "../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder;

  builder.add({ label: "1L", documentation: "Add 1 level of xp", kind: CompletionItemKind.Value });
  builder.add({ label: "-1L", documentation: "Remove 1 level of xp", kind: CompletionItemKind.Value });
  builder.add({ label: "-1000L", documentation: "Removes 1000 xp levels", kind: CompletionItemKind.Value });
}

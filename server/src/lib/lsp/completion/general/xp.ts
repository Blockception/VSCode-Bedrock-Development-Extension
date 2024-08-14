import { CompletionItemKind } from "vscode-languageserver";
import { Context } from "../../context/context";
import { CompletionContext } from "../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder;

  builder.add({ label: "1L", documentation: "Add 1 level of xp", kind: CompletionItemKind.Value });
  builder.add({ label: "-1L", documentation: "Remove 1 level of xp", kind: CompletionItemKind.Value });
  builder.add({ label: "-1000L", documentation: "Removes 1000 xp levels", kind: CompletionItemKind.Value });
}

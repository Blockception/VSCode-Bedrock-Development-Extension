import { CompletionItemKind } from "vscode-languageserver";
import { Context } from "../../context/context";
import { CompletionContext } from "../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  context.builder.add({ label:'"', documentation: "The start of the string", kind: CompletionItemKind.Constant}).insertText='""';
}

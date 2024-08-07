import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionContext } from "../context";
import { Context } from "../../context/context";

export function provideCompletion(context: Context<CompletionContext>): void {
  context.builder.add({ label:'"', documentation: "The start of the string", kind: CompletionItemKind.Constant}).insertText='""';
}

import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../Code/SimpleContext";
import { CompletionBuilder } from "../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.add({ label:'"', documentation: "The start of the string", kind: CompletionItemKind.Constant}).insertText='""';
}

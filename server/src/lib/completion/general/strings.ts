import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../Code/SimpleContext";
import { CompletionBuilder } from "../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.add('"', "The start of the string", CompletionItemKind.Constant).insertText='""';
}

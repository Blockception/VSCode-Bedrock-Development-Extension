import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.Add('"', "The start of the string", CompletionItemKind.Constant).insertText='""';
}

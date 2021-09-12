import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/context";

export function ProvideCompletion(context: CommandCompletionContext | CompletionBuilder): void {
  const data = context.doc.getConfiguration();
  const receiver = CommandCompletionContext.is(context) ? context.receiver : context;

  data.definitions["name"]?.defined.forEach((name) => receiver.Add(name, "The defined name: " + name, CompletionItemKind.Value));
}

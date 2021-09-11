import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";

export function ProvideCompletion(Context: CommandCompletionContext | CompletionBuilder): void {
  let data = Context.doc.getConfiguration();
  let receiver = CommandCompletionContext.is(Context) ? Context.receiver : Context;

  data.defintions.name.defined.forEach((name) => receiver.Add(name, "The defined name: " + name, CompletionItemKind.Value));
}

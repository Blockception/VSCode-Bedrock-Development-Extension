import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  receiver.Add('"', "The start of the string", CompletionItemKind.Constant);
}

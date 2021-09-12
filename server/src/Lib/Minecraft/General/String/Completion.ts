import { CompletionItemKind } from "vscode-languageserver-types";
import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;

  receiver.Add('"', "The start of the string", CompletionItemKind.Constant);
}

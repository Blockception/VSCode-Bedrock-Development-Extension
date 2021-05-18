import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  receiver.AddFromRange(Database.Data.General.Items, CompletionItemKind.Struct);
}

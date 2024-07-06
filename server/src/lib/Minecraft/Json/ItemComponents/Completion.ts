import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CanDestroyComponent, CanPlaceOnComponent, Example, KeepOnDeathComponent, LockInInventoryComponent, LockInSlotComponent } from "./Constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;
  receiver.Add("Json Item Components Example", Example, CompletionItemKind.Snippet, Example);
  receiver.Add("Can destroy component", CanDestroyComponent, CompletionItemKind.Snippet, CanDestroyComponent);
  receiver.Add("Can place on component", CanPlaceOnComponent, CompletionItemKind.Snippet, CanPlaceOnComponent);
  receiver.Add("Lock in inventory component", LockInInventoryComponent, CompletionItemKind.Snippet, LockInInventoryComponent);
  receiver.Add("Keep on death component", KeepOnDeathComponent, CompletionItemKind.Snippet, KeepOnDeathComponent);
  receiver.Add("Lock in slot component", LockInSlotComponent, CompletionItemKind.Snippet, LockInSlotComponent);
}

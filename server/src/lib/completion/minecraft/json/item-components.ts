import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../builder/builder";
import { CanDestroyComponent, CanPlaceOnComponent, Example, KeepOnDeathComponent, LockInInventoryComponent, LockInSlotComponent } from "../../../Minecraft/Json/ItemComponents/Constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;
  receiver.add("Json Item Components Example", Example, CompletionItemKind.Snippet, Example);
  receiver.add("Can destroy component", CanDestroyComponent, CompletionItemKind.Snippet, CanDestroyComponent);
  receiver.add("Can place on component", CanPlaceOnComponent, CompletionItemKind.Snippet, CanPlaceOnComponent);
  receiver.add("Lock in inventory component", LockInInventoryComponent, CompletionItemKind.Snippet, LockInInventoryComponent);
  receiver.add("Keep on death component", KeepOnDeathComponent, CompletionItemKind.Snippet, KeepOnDeathComponent);
  receiver.add("Lock in slot component", LockInSlotComponent, CompletionItemKind.Snippet, LockInSlotComponent);
}

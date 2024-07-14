import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../builder/builder";
import {
  CanDestroyComponent,
  CanPlaceOnComponent,
  Example,
  KeepOnDeathComponent,
  LockInInventoryComponent,
  LockInSlotComponent,
} from "../../../Minecraft/Json/ItemComponents/Constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;
  receiver.add({
    label: "Json Item Components Example",
    documentation: Example,
    kind: CompletionItemKind.Snippet,
    insertText: Example,
  });
  receiver.add({
    label: "Can destroy component",
    documentation: CanDestroyComponent,
    kind: CompletionItemKind.Snippet,
    insertText: CanDestroyComponent,
  });
  receiver.add({
    label: "Can place on component",
    documentation: CanPlaceOnComponent,
    kind: CompletionItemKind.Snippet,
    insertText: CanPlaceOnComponent,
  });
  receiver.add({
    label: "Lock in inventory component",
    documentation: LockInInventoryComponent,
    kind: CompletionItemKind.Snippet,
    insertText: LockInInventoryComponent,
  });
  receiver.add({
    label: "Keep on death component",
    documentation: KeepOnDeathComponent,
    kind: CompletionItemKind.Snippet,
    insertText: KeepOnDeathComponent,
  });
  receiver.add({
    label: "Lock in slot component",
    documentation: LockInSlotComponent,
    kind: CompletionItemKind.Snippet,
    insertText: LockInSlotComponent,
  });
}

import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../../builder/builder";
import {
  CanDestroyComponent,
  CanPlaceOnComponent,
  Example,
  KeepOnDeathComponent,
  LockInInventoryComponent,
  LockInSlotComponent,
} from "../../../../minecraft/json/item-components/constants";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver.withDefaults({ kind: CompletionItemKind.Snippet });

  receiver.add({
    label: "Json Item Components Example",
    documentation: Example,
    insertText: Example,
  });
  receiver.add({
    label: "Can destroy component",
    documentation: CanDestroyComponent,
    insertText: CanDestroyComponent,
  });
  receiver.add({
    label: "Can place on component",
    documentation: CanPlaceOnComponent,
    insertText: CanPlaceOnComponent,
  });
  receiver.add({
    label: "Lock in inventory component",
    documentation: LockInInventoryComponent,
    insertText: LockInInventoryComponent,
  });
  receiver.add({
    label: "Keep on death component",
    documentation: KeepOnDeathComponent,
    insertText: KeepOnDeathComponent,
  });
  receiver.add({
    label: "Lock in slot component",
    documentation: LockInSlotComponent,
    insertText: LockInSlotComponent,
  });
}

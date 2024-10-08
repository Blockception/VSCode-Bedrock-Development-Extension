import { CompletionItemKind } from "vscode-languageserver";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import {
  CanDestroyComponent,
  CanPlaceOnComponent,
  Example,
  KeepOnDeathComponent,
  LockInInventoryComponent,
  LockInSlotComponent,
} from "../../../../minecraft/json/item-components/constants";

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: CompletionItemKind.Snippet });

  builder.add({
    label: "Json Item Components Example",
    documentation: Example,
    insertText: Example,
  });
  builder.add({
    label: "Can destroy component",
    documentation: CanDestroyComponent,
    insertText: CanDestroyComponent,
  });
  builder.add({
    label: "Can place on component",
    documentation: CanPlaceOnComponent,
    insertText: CanPlaceOnComponent,
  });
  builder.add({
    label: "Lock in inventory component",
    documentation: LockInInventoryComponent,
    insertText: LockInInventoryComponent,
  });
  builder.add({
    label: "Keep on death component",
    documentation: KeepOnDeathComponent,
    insertText: KeepOnDeathComponent,
  });
  builder.add({
    label: "Lock in slot component",
    documentation: LockInSlotComponent,
    insertText: LockInSlotComponent,
  });
}

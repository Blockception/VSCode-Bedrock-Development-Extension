import { CompletionBuilder } from "../../builder/builder";
import { CompletionItemKind } from "vscode-languageserver";
import { GetCurrentAttribute } from "./attributes";
import { IsEditingValue } from "./attribute-values";
import { Kinds } from "../../../../constants/kinds";
import { Modes } from 'bc-minecraft-bedrock-types';
import { OffsetWord } from "bc-vscode-words";
import { SimpleContext } from "../../../../Code";

import * as M from '../modes/modes';
import * as Item from '../behavior-pack/items';
import * as Integer from '../../general/integer';

export function provideCompletion(context: SimpleContext<CompletionBuilder>, selector: OffsetWord, pos: number): void {
  const receiver = context.receiver;

  if (IsEditingValue(selector, pos)) {
    const attr = GetCurrentAttribute(selector, pos);

    switch (attr) {
      case "data":
        return Integer.provideCreateCompletion(receiver, -1, 9);

      case "item":
        return Item.provideCompletion(context)

      case "location":
        return M.provideModeCompletion(Modes.SlotType, context);

      case "slot":
        return Integer.provideCreateCompletion(receiver, 0, 53);

      case "quantity":
        return Integer.provideCreateCompletion(receiver, 0, 10);
    }

    return;
  }
  
  receiver.add({ label: "data", documentation: "The data of the item that the selector is looking for", kind: Kinds.Completion.Integer, insertText: "data="});
  receiver.add({ label: "item", documentation: "The item that the selector is looking for", kind: Kinds.Completion.Item, insertText: "item="});
  receiver.add({ label: "location", documentation: "The slot id identification", kind: CompletionItemKind.Enum, insertText: "location="});
  receiver.add({ label: "quantity", documentation: "The quantity of the item that the selector is looking for", kind: Kinds.Completion.Integer, insertText: "quantity="});
  receiver.add({ label: "slot", documentation: "The slot number to check", kind: Kinds.Completion.Integer, insertText: "slot="});
}

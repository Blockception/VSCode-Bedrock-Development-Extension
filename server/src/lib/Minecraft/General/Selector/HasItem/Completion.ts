import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../../Code";
import { CompletionBuilder } from "../../../../Completion/Builder";

import { Kinds } from "../../Kinds";
import { GetCurrentAttribute } from "../Attributes/Completion";
import { IsEditingValue } from "../AttributeValue/Completion";

import * as SlotType from '../../../Modes/SlotType/Completion';
import * as Item from '../../../BehaviorPack/Items/Completion';
import * as Integer from '../../Integer/Completion';

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
        return SlotType.provideCompletion(context);

      case "slot":
        return Integer.provideCreateCompletion(receiver, 0, 53);

      case "quantity":
        return Integer.provideCreateCompletion(receiver, 0, 10);
    }

    return;
  }
  
  receiver.Add("data", "The data of the item that the selector is looking for", Kinds.Completion.Integer, "data=");
  receiver.Add("item", "The item that the selector is looking for", Kinds.Completion.Item, "item=");
  receiver.Add("location", "The slot id identification", CompletionItemKind.Enum, "location=");
  receiver.Add("quantity", "The quantity of the item that the selector is looking for", Kinds.Completion.Integer, "quantity=");
  receiver.Add("slot", "The slot number to check", Kinds.Completion.Integer, "slot=");
}

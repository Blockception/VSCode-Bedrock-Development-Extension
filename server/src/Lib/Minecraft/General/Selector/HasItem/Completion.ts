import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../../Code/include";
import { CompletionBuilder } from "../../../../Completion/Builder";
import { Modes } from '../../../include';
import { Integer } from '../../Completion';
import { Kinds } from "../../Kinds";
import { GetCurrentAttribute } from "../Attributes/Completion";
import { IsEditingValue } from "../AttributeValue/Completion";

import * as Item from '../../../BehaviorPack/Items/Completion'

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>, selector: OffsetWord, pos: number): void {
  const receiver = context.receiver;

  if (IsEditingValue(selector, pos)) {
    const attr = GetCurrentAttribute(selector, pos);

    switch (attr) {
      case "data":
        return Integer.ProvideCreateCompletion(receiver, -1, 9);

      case "item":
        return Item.ProvideCompletion(context)

      case "location":
        return Modes.SlotType.ProvideCompletion(context);

      case "slot":
        return Integer.ProvideCreateCompletion(receiver, 0, 53);

      case "quantity":
        return Integer.ProvideCreateCompletion(receiver, 0, 10);

      default:
        return;
    }
  } else {
    receiver.Add("data", "The data of the item that the selector is looking for", Kinds.Completion.Integer);
    receiver.Add("item", "The item that the selector is looking for", Kinds.Completion.Item);
    receiver.Add("location", "The slot id identification", CompletionItemKind.Enum);
    receiver.Add("quantity", "The quantity of the item that the selector is looking for", Kinds.Completion.Integer);
    receiver.Add("slot", "The slot number to check", Kinds.Completion.Integer);
  }
}

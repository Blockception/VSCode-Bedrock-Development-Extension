import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { SimpleContext } from "../../../Code";
import { CompletionBuilder } from "../../builder/builder";

import { Kinds } from "../../../Minecraft/General/Kinds";
import { GetCurrentAttribute } from "./attributes";
import { IsEditingValue } from "./attribute-values";

import * as M from '../modes/modes';
import * as Item from '../behavior-pack/items';
import * as Integer from '../../general/integer';
import { Modes } from 'bc-minecraft-bedrock-types';

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
  
  receiver.Add("data", "The data of the item that the selector is looking for", Kinds.Completion.Integer, "data=");
  receiver.Add("item", "The item that the selector is looking for", Kinds.Completion.Item, "item=");
  receiver.Add("location", "The slot id identification", CompletionItemKind.Enum, "location=");
  receiver.Add("quantity", "The quantity of the item that the selector is looking for", Kinds.Completion.Integer, "quantity=");
  receiver.Add("slot", "The slot number to check", Kinds.Completion.Integer, "slot=");
}

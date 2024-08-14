import { Modes } from 'bc-minecraft-bedrock-types';
import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { Kinds } from "../../../../constants";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { IsEditingValue } from "./attribute-values";
import { GetCurrentAttribute } from "./attributes";


import * as Integer from '../../general/integer';
import * as Item from '../behavior-pack/items';
import * as M from '../modes/modes';

export function provideCompletion(context: Context<CompletionContext>, selector: OffsetWord, pos: number): void {
  const builder = context.builder;

  if (IsEditingValue(selector, pos)) {
    const attr = GetCurrentAttribute(selector, pos);

    switch (attr) {
      case "data":
        return Integer.provideCreateCompletion(builder, -1, 9);

      case "item":
        return Item.provideCompletion(context)

      case "location":
        return M.provideModeCompletion(Modes.SlotType, context);

      case "slot":
        return Integer.provideCreateCompletion(builder, 0, 53);

      case "quantity":
        return Integer.provideCreateCompletion(builder, 0, 10);
    }

    return;
  }
  
  builder.add({ label: "data", documentation: "The data of the item that the selector is looking for", kind: Kinds.Completion.Integer, insertText: "data="});
  builder.add({ label: "item", documentation: "The item that the selector is looking for", kind: Kinds.Completion.Item, insertText: "item="});
  builder.add({ label: "location", documentation: "The slot id identification", kind: CompletionItemKind.Enum, insertText: "location="});
  builder.add({ label: "quantity", documentation: "The quantity of the item that the selector is looking for", kind: Kinds.Completion.Integer, insertText: "quantity="});
  builder.add({ label: "slot", documentation: "The slot number to check", kind: Kinds.Completion.Integer, insertText: "slot="});
}

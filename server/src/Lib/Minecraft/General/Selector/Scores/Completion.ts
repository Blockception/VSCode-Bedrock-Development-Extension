import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { Offset } from "../../../../Code/include";
import { CompletionBuilder } from "../../../../Completion/include";
import { General } from "../../../include";

export function ProvideCompletion(receiver: CompletionBuilder, selector: OffsetWord, pos: number): void {
  if (Offset.IsWithin(selector, pos)) {
    receiver.Add("0", "test for the exact value of 0", CompletionItemKind.Value);
    receiver.Add("!0", "test for the exact value of everything but 0", CompletionItemKind.Value);
    receiver.Add("0..", "test for the everything equal to 0 or higher", CompletionItemKind.Value);
    receiver.Add("..0", "test for the everything equal to 0 or lower", CompletionItemKind.Value);
    receiver.Add("0..10", "test for the everything equal to 0 or 10 and everything in between", CompletionItemKind.Value);
    receiver.Add("!0..10", "test for the everything not equal to 0 or 10 and everything in between", CompletionItemKind.Value);
  } else {
    const old_event = receiver.OnNewItem;

    receiver.OnNewItem = (item) => {
      item.insertText = item.label += "=";

      if (old_event) old_event(item);
    };

    General.Objectives.ProvideCompletion(context);
    receiver.OnNewItem = old_event;
  }
}

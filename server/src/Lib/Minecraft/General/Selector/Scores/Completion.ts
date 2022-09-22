import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { Offset, SimpleContext } from "../../../../Code";
import { CompletionBuilder } from "../../../../Completion/Builder";
import * as Objectives from "../../../General/Objectives/Completion";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>, selector: OffsetWord, pos: number): void {
  const charBefore = Offset.charAt(selector, pos - 1);

  if (charBefore === "{") {
    return provideObjectives(context);
  }

  if (Offset.IsWithin(selector, pos) || charBefore === "=") {
    return ProvideRange(context);
  }

  return provideObjectives(context);
}

function provideObjectives(context: SimpleContext<CompletionBuilder>) {
  const receiver = context.receiver;
  const old_event = receiver.OnNewItem;

  receiver.OnNewItem = (item) => {
    item.insertText = item.label + "=";

    if (old_event) old_event(item);
  };

  Objectives.ProvideCompletion(context);
  receiver.OnNewItem = old_event;
}

function ProvideRange(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver;
  receiver.Add("0", "test for the exact value of 0", CompletionItemKind.Value);
  receiver.Add("!0", "test for the exact value of everything but 0", CompletionItemKind.Value);
  receiver.Add("0..", "test for the everything equal to 0 or higher", CompletionItemKind.Value);
  receiver.Add("..0", "test for the everything equal to 0 or lower", CompletionItemKind.Value);
  receiver.Add("0..10", "test for the everything equal to 0 or 10 and everything in between", CompletionItemKind.Value);
  receiver.Add(
    "!0..10",
    "test for the everything not equal to 0 or 10 and everything in between",
    CompletionItemKind.Value
  );
}

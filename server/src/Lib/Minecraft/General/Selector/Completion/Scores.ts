import { CompletionItemKind } from "vscode-languageserver";
import { OffsetWord } from "bc-vscode-words";
import { CompletionBuilder } from "../../../../Completion/Builder";
import { Objectives } from "../../include";
import { Offset } from "../../../../Code/Offset";

export function provideSelectorScoreCompletion(receiver: CompletionBuilder, selector: OffsetWord, pos: number): void {
  if (Offset.IsWithin(selector, pos)) {
    receiver.Add("0", "test for the exact value of 0", CompletionItemKind.Value);
    receiver.Add("!0", "test for the exact value of everything but 0", CompletionItemKind.Value);
    receiver.Add("0..", "test for the everything equal to 0 or higher", CompletionItemKind.Value);
    receiver.Add("..0", "test for the everything equal to 0 or lower", CompletionItemKind.Value);
    receiver.Add("0..10", "test for the everything equal to 0 or 10 and everything in between", CompletionItemKind.Value);
    receiver.Add("!0..10", "test for the everything not equal to 0 or 10 and everything in between", CompletionItemKind.Value);
  } else {
    Objectives.ProvideCompletionPost(receiver, "=");
  }
}

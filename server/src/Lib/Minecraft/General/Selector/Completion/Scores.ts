import { CompletionItemKind } from "vscode-languageserver";
import { LocationWord } from "bc-vscode-words";
import { IsEditingValue } from "../Functions";
import { CompletionBuilder } from "../../../../Completion/Builder";
import { Objectives } from "../../include";

export function provideSelectorScoreCompletion(receiver: CompletionBuilder, selector: LocationWord, pos: number): void {
  if (IsEditingValue(selector, pos)) {
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

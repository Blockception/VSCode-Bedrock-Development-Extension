import { CompletionList, CompletionItemKind } from "vscode-languageserver";
import { LocationWord } from "bc-vscode-words";
import { provideObjectivePostCompletion } from "../../Objectives/Completion";
import { IsEditingValue } from "../Functions";

export function provideSelectorScoreCompletion(receiver: CompletionBuilder, selector: LocationWord, pos: number): void {
  if (IsEditingValue(selector, pos)) {
    receiver.items.push(
      {
        label: "0",
        kind: CompletionItemKind.Value,
        documentation: "test for the exact value of 0",
      },
      {
        label: "!0",
        kind: CompletionItemKind.Value,
        documentation: "test for the exact value of everything but 0",
      },
      {
        label: "0..",
        kind: CompletionItemKind.Value,
        documentation: "test for the everything equal to 0 or higher",
      },
      {
        label: "..0",
        kind: CompletionItemKind.Value,
        documentation: "test for the everything equal to 0 or lower",
      },
      {
        label: "0..10",
        kind: CompletionItemKind.Value,
        documentation: "test for the everything equal to 0 or 10 and everything in between",
      },
      {
        label: "!0..10",
        kind: CompletionItemKind.Value,
        documentation: "test for the everything not equal to 0 or 10 and everything in between",
      }
    );
  } else {
    provideObjectivePostCompletion(receiver, "=");
  }
}

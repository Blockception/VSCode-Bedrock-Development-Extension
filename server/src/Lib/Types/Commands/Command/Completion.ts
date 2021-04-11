import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/include";
import { Manager } from "../../../Manager/Manager";

export function ProvideCompletion(receiver: CompletionBuilder): void {
  for (let [key, value] of Manager.Data.Commands.Subset) {
    let documentation: string = "The command: " + key;

    let Limit = value.length;

    if (Limit > 7) {
      documentation += "\n- " + value[0].Command.documentation.value;
    } else {
      for (let I = 0; I < Limit; I++) {
        let Line = "\n- " + value[I].Command.documentation.value;

        if (!documentation.includes(Line)) documentation += Line;
      }
    }

    receiver.Add(key, documentation, CompletionItemKind.Class);
  }
}

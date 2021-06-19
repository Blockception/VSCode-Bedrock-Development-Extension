import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/include";
import { Manager } from "../../../Manager/Manager";
import { CommandInfo } from "../Info/include";

export function ProvideCompletion(receiver: CompletionBuilder): void {
  const edu = receiver.doc.getConfiguration().settings.Education.Enable;

  GetCompletion(Manager.Data.Vanilla.Commands.Subset, receiver);
  if (edu) GetCompletion(Manager.Data.Edu.Commands.Subset, receiver);
}

function GetCompletion(Data: Map<string, CommandInfo[]>, receiver: CompletionBuilder) {
  for (let [key, value] of Data) {
    let documentation: string = "The command: " + key;

    const Limit = value.length;

    if (Limit > 7) {
      documentation += "\n- " + value[0].Command.documentation.value;
    } else {
      for (let I = 0; I < Limit; I++) {
        const Line = "\n- " + value[I].Command.documentation.value;

        if (!documentation.includes(Line)) documentation += Line;
      }
    }

    receiver.Add(key, documentation, CompletionItemKind.Class);
  }
}

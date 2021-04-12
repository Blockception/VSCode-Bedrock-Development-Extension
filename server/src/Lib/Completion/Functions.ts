import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { DataCollector } from "../Database/DataCollector";
import { Identifiable, Documentable, Locatable } from "../Types/Minecraft/Interfaces/include";

export namespace Completion {
  export function CreateCompletion(value: Identifiable, valuekind: CompletionItemKind): CompletionItem {
    if (Documentable.is(value)) {
      return {
        label: value.Identifier,
        documentation: value.Documentation,
        kind: valuekind,
      };
    } else {
      return {
        label: value.Identifier,
        documentation: { kind: "markdown", value: "The custom definition of: " + value.Identifier },
        kind: valuekind,
      };
    }
  }

  export function Convert<T extends Identifiable & Locatable>(value: DataCollector<T>, valuekind: CompletionItemKind, receiver: CompletionItem[]): void {
    value.ForEach((data) => {
      let Item = CreateCompletion(data, valuekind);
      receiver.push(Item);
    });
  }
}

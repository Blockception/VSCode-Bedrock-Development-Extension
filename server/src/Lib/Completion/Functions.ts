import { Documentated, Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/include";
import { CompletionItem, CompletionItemKind } from "vscode-languageserver";

export namespace Completion {
  export function CreateCompletion(value: Identifiable, valuekind: CompletionItemKind): CompletionItem {
    if (Documentated.is(value) && value.documentation) {
      return {
        label: value.id,
        documentation: value.documentation,
        kind: valuekind,
      };
    }

    return {
      label: value.id,
      documentation: { kind: "markdown", value: "The custom definition of: " + value.id },
      kind: valuekind,
    };
  }
}

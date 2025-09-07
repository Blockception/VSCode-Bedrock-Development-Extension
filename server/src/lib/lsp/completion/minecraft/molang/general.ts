import { MolangFunction } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../builder";

export function generateMolangFunction(
  scope: string,
  data: MolangFunction,
  builder: CompletionBuilder,
  kinds: CompletionItemKind = CompletionItemKind.Function
): void {
  let syntax = data.id;
  let doc = data.deprecated ? data.deprecated : data.documentation ?? `The molang query: ${data.id}`;

  if (data.parameters && data.parameters.length > 0) {
    syntax += "(" + data.parameters.map((p) => p.id).join(", ") + ")";
    doc += "\n\n";

    doc += data.parameters.map((i) => `- **${i.id}** ${i.documentation}`).join("\n");
  }

  builder.add({
    label: data.id,
    documentation: {
      kind: "markdown",
      value: `${scope}.${syntax}\n\n${doc}`,
    },
    deprecated: data.deprecated !== undefined,
    kind: kinds,
    insertText: syntax,
  });
}

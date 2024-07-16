import { MolangData, MolangFunction } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  MolangData.General.Math.forEach((item) => Generate(item, context.receiver));
}

function Generate(
  data: MolangFunction,
  builder: CompletionBuilder,
  kinds: CompletionItemKind = CompletionItemKind.Function
): void {
  let insert = data.id;

  if (data.parameters && data.parameters.length > 0) {
    insert += `(${data.parameters.map((p) => p.id).join(", ")})`;
  }

  builder.add({ label:data.id, documentation: data.documentation ?? `The molang math: ${data.id}`, kind: kinds, insertText: insert});
}

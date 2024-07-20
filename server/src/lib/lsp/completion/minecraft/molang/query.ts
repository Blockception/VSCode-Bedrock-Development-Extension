import { MolangData } from "bc-minecraft-molang";
import { MolangFunction } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  MolangData.General.Queries.forEach((item) => Generate(item, context.builder));
}

function Generate(data: MolangFunction, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Function): void {
  let insert = data.id;

  if (data.parameters && data.parameters.length > 0) {
    insert += '(' + data.parameters.map((p) => p.id).join(', ') + ')';
  }

  builder.add({ label:data.id, documentation: data.documentation ?? `The molang query: ${data.id}`, kind: kinds, insertText: insert});
}

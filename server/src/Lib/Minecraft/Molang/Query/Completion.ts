import { MolangData } from "bc-minecraft-molang";
import { MolangFunction } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  MolangData.General.Queries.forEach((item) => Generate(item, context.receiver));
}

function Generate(data: MolangFunction, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Function): void {
  let insert = data.id;

  if (data.parameters && data.parameters.length > 0) {
    insert += '(' + data.parameters.map((p) => p.id).join(', ') + ')';
  }

  builder.Add(data.id, data.documentation ?? `The molang query: ${data.id}`, kinds, insert);
}

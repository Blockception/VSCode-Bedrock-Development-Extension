import { MolangData } from "bc-minecraft-molang";
import { MolangFunction } from "bc-minecraft-molang/lib/src/MolangData/MolangData";
import { cp } from "fs";
import { CompletionItemKind, TextEdit } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  MolangData.General.Queries.forEach((item) => Generate(item, context.receiver));
}

function Generate(data: MolangFunction, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Function): void {
  const comp = builder.Add(data.id, data.documentation ?? `The molang query: ${data.id}`, kinds);

  if (data.parameters && data.parameters.length > 0) {
    const p = data.parameters.map((p) => p.id);

    comp.filterText = comp.label;
    comp.insertText = `${data.id}(${p.join(", ")})`;

    return;
  }
}

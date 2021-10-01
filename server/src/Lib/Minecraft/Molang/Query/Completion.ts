import { MolangData } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  MolangData.General.Queries.forEach((item) => Generate(item, context.receiver));
}

function Generate(data: MolangData.Data, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Function): void {
  builder.Add(data.id, data.documentation ?? `The molang query: ${data.id}`, kinds);
}

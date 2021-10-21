import { PackType } from "bc-minecraft-bedrock-project";
import { Defined, MolangData } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { GetDataSet } from "../General/GetDataSet";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);
  const data = GetDataSet(context.doc.uri);

  data?.Contexts.forEach((item) => Generate(item, context.receiver));
}

function Generate(data: MolangData.Data, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Struct): void {
  builder.Add(data.id, data.documentation ?? `The molang context variable: ${data.id}`, kinds);
}

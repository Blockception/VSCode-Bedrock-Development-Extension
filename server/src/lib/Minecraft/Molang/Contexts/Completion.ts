import { PackType } from "bc-minecraft-bedrock-project";
import { Data, Defined, MolangData } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { GetDataSet } from "../General/GetDataSet";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);
  const data = GetDataSet(context.doc.uri);

  data?.Contexts.forEach((item) => Generate(item, context.receiver));
}

function Generate(data: Data, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Struct): void {
  builder.Add(data.id, data.documentation ?? `The molang context variable: ${data.id}`, kinds);
}

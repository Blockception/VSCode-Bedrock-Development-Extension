import { Data } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { GetDataSet } from "../../../Minecraft/Molang/General/GetDataSet";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const data = GetDataSet(context.doc.uri);

  data?.Contexts.forEach((item) => generate(item, context.receiver));
}

function generate(data: Data, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Struct): void {
  builder.add({label: data.id, documentation: data.documentation ?? `The molang context variable: ${data.id}`, kind: kinds});
}

import { Data } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { GetDataSet } from "../../../../minecraft/molang/getdataset";
import { Context } from '../../../context/context';
import { CompletionBuilder } from "../../builder/builder";
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const data = GetDataSet(context.document.uri);

  data?.Contexts.forEach((item) => generate(item, context.builder));
}

function generate(data: Data, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Struct): void {
  builder.add({
    label: data.id,
    documentation: data.documentation ?? `The molang context variable: ${data.id}`,
    kind: kinds,
  });
}

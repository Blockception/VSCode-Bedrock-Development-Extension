import { PackType } from "bc-minecraft-bedrock-project";
import { Data, Defined } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { GetDataSet } from "../../../../minecraft/molang/getdataset";

export function provideCompletion(context: Context<CompletionContext>): void {
  const packType = PackType.detect(context.document.uri);
  const data = GetDataSet(context.document.uri);

  data?.Temps.forEach((item) => Generate(item, context.builder));

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      context.database.ProjectData.resourcePacks.entities.forEach((entity) =>
        GenerateDU(entity.molang.temps, context.builder, entity.id)
      );
  }
}

function Generate(
  data: Data,
  builder: CompletionBuilder,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  builder.add({
    label: data.id,
    documentation: data.documentation ?? `The molang temp variable: ${data.id}`,
    kind: kinds,
  });
}

function GenerateDU(
  data: Defined<string>,
  builder: CompletionBuilder,
  ownerid: string,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  data.defined.forEach((item) => {
    builder.add({
      label: item,
      documentation: `The molang temp variable: ${item}\nDeclared by '${ownerid}'`,
      kind: kinds,
    });
  });
}

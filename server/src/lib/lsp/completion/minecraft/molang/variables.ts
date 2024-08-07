import { PackType } from "bc-minecraft-bedrock-project";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { GetDataSet } from "../../../../minecraft/molang/getdataset";

export function provideCompletion(context: Context<CompletionContext>): void {
  const packType = PackType.detect(context.document.uri);
  const data = GetDataSet(context.document.uri);
  const builder = context.builder.withDefaults({
    kind: CompletionItemKind.Variable,
  });

  data?.Variables.forEach((item) => {
    builder.add({ label: item.id, documentation: item.documentation ?? `The molang variable: ${item.id}` });
  });

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      context.database.ProjectData.resourcePacks.entities.forEach((entity) =>
        entity.molang.variables.defined.forEach((item) => {
          builder.add({ label: item, documentation: `The molang variable: ${item}\nDeclared by '${entity.id}'` });
        })
      );
  }
}

import { PackType } from "bc-minecraft-bedrock-project";
import { Data, Defined, MolangData } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../lsp/database/database";
import { GetDataSet } from "../../../../minecraft/molang/getdataset";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);
  const data = GetDataSet(context.doc.uri);
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
      context.projectData.ResourcePacks.entities.forEach((entity) =>
        entity.molang.variables.defined.forEach((item) => {
          builder.add({ label: item, documentation: `The molang variable: ${item}\nDeclared by '${entity.id}'` });
        })
      );
  }
}

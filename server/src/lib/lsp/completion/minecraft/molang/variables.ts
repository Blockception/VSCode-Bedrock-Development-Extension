import { PackType } from "bc-minecraft-bedrock-project";
import { CompletionItemKind } from "vscode-languageserver";
import { getIdentifier, getScopeDefined } from "../../../../minecraft/molang";
import { GetDataSet } from "../../../../minecraft/molang/getdataset";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

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
        getScopeDefined(entity.molang, "v", "variable").forEach((item) => {
          const identifier = getIdentifier(item);
          builder.add({
            label: identifier,
            documentation: `The molang variable: ${identifier}\nDeclared by '${entity.id}'`,
          });
        })
      );
  }
}

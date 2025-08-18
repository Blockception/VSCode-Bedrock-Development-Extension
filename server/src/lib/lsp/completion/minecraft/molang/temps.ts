import { PackType } from "bc-minecraft-bedrock-project";
import { Data, ResourceReferenceNode, VariableNode } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver";
import { getIdentifier, getScopeDefined } from "../../../../minecraft/molang";
import { GetDataSet } from "../../../../minecraft/molang/getdataset";
import { Context } from "../../../context/context";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const packType = PackType.detect(context.document.uri);
  const data = GetDataSet(context.document.uri);

  data?.Temps.forEach((item) => Generate(item, context.builder));

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      context.database.ProjectData.resourcePacks.entities.forEach((entity) =>
        generateDU(getScopeDefined(entity.molang, "temp", "t"), context.builder, entity.id)
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

function generateDU(
  data: (ResourceReferenceNode | VariableNode)[],
  builder: CompletionBuilder,
  ownerid: string,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  data.forEach((item) => {
    const identifier = getIdentifier(item);
    builder.add({
      label: identifier,
      documentation: `The molang temp variable: ${identifier}\nDeclared by '${ownerid}'`,
      kind: kinds,
    });
  });
}

import { PackType } from "bc-minecraft-bedrock-project";
import { Data, Defined, MolangData } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { GetDataSet } from "../../../Minecraft/Molang/General/GetDataSet";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);
  const data = GetDataSet(context.doc.uri);

  data?.Variables.forEach((item) => Generate(item, context.receiver));

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      Database.ProjectData.ResourcePacks.entities.forEach((entity) =>
        GenerateDU(entity.molang.variables, context.receiver, entity.id)
      );
  }
}

function Generate(
  data: Data,
  builder: CompletionBuilder,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  builder.add({label: data.id, documentation: data.documentation ?? `The molang variable: ${data.id}`, kind: kinds});
}

function GenerateDU(
  data: Defined<string>,
  builder: CompletionBuilder,
  ownerid: string,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  data.defined.forEach((item) => {
    builder.add({label: item, documentation: `The molang variable: ${item}\nDeclared by '${ownerid}'`, kind: kinds});
  });
}

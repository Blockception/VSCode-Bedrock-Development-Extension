import { PackType } from "bc-minecraft-bedrock-project";
import { Data, Defined } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { GetDataSet } from "../General/GetDataSet";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);
  const data = GetDataSet(context.doc.uri);

  data?.Temps.forEach((item) => Generate(item, context.receiver));

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      Database.ProjectData.ResourcePacks.entities.forEach((entity) =>
        GenerateDU(entity.molang.temps, context.receiver, entity.id)
      );
  }
}

function Generate(
  data: Data,
  builder: CompletionBuilder,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  builder.Add(data.id, data.documentation ?? `The molang temp variable: ${data.id}`, kinds);
}

function GenerateDU(
  data: Defined<string>,
  builder: CompletionBuilder,
  ownerid: string,
  kinds: CompletionItemKind = CompletionItemKind.Variable
): void {
  data.defined.forEach((item) => {
    builder.Add(item, `The molang temp variable: ${item}\nDeclared by '${ownerid}'`, kinds);
  });
}

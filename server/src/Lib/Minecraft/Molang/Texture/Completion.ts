import { PackType } from "bc-minecraft-bedrock-project";
import { Defined, MolangData } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      Database.ProjectData.ResourcePacks.entities.forEach((entity) => GenerateDU(entity.molang.textures, context.receiver, entity.id));
  }
}

function Generate(data: MolangData.Data, builder: CompletionBuilder, kinds: CompletionItemKind = CompletionItemKind.Reference): void {
  builder.Add(data.id, data.documentation ?? `The molang texture: ${data.id}`, kinds);
}

function GenerateDU(data: Defined<string>, builder: CompletionBuilder, ownerid: string, kinds: CompletionItemKind = CompletionItemKind.Reference): void {
  data.defined.forEach((item) => {
    builder.Add(item, `The molang texture: ${item}\nDeclared by '${ownerid}'`, kinds);
  });
}

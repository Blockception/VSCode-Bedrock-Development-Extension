import { MolangData, MolangFunction } from "bc-minecraft-molang";
import { CompletionItemKind } from "vscode-languageserver-types";
import { Context } from '../../../context/context';
import { CompletionBuilder } from "../../builder/builder";
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  MolangData.General.Math.forEach((item) => Generate(item, context.builder));
}

function Generate(
  data: MolangFunction,
  builder: CompletionBuilder,
  kinds: CompletionItemKind = CompletionItemKind.Function
): void {
  let insert = data.id;

  if (data.parameters && data.parameters.length > 0) {
    insert += `(${data.parameters.map((p) => p.id).join(", ")})`;
  }

  builder.add({ label:data.id, documentation: data.documentation ?? `The molang math: ${data.id}`, kind: kinds, insertText: insert});
}

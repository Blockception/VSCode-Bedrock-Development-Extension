import { MolangFunction } from "bc-minecraft-molang";
import { OffsetWord } from "bc-vscode-words";
import { SignatureInformation } from "vscode-languageserver";
import { Offset } from "../../../../util";

export function generateSignatures(
  scope: string,
  cursor: number,
  items: MolangFunction[],
  parameters: OffsetWord[],
  query: string
) {
  return items.filter((item) => item.id === query).map((item) => generateSignature(scope, cursor, item, parameters));
}

export function generateSignature(
  scope: string,
  cursor: number,
  item: MolangFunction,
  parameters: OffsetWord[]
): SignatureInformation {
  const out = {
    label: `${scope}.${item.id}`,
    activeParameter: parameters.length,
    documentation: item.documentation ?? `${scope}.${item.id}`,
    parameters: [] as SignatureInformation["parameters"],
  };

  if (parameters.length > 0) {
    const last = parameters[parameters.length - 1];
    if (Offset.isAfter(last, cursor)) {
      out.activeParameter = out.activeParameter + 1;
    }
  }

  if (item.parameters) {
    out.label += `(${item.parameters.map((p) => `<${p.id}>`).join(", ")})`;
    out.parameters = item.parameters.map((p) => {
      return { label: p.id, documentation: p.documentation };
    });
  }

  return out;
}

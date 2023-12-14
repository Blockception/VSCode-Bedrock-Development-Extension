import { MolangData, MolangFunction } from "bc-minecraft-molang";
import { SignatureHelp, SignatureInformation } from "vscode-languageserver-types";
import { SignatureCarrier } from "../../../Signatures/Carrier";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(fn: string | undefined): SignatureHelp | undefined {
  if (!fn) return MathSignature;

  const sign: SignatureHelp = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [],
  };

  GenerateItems(MolangData.General.Math, fn, sign.signatures);

  return sign;
}

function GenerateItems(items: MolangFunction[], query: string, receiver: SignatureInformation[]) {
  for (let I = 0; I < items.length; I++) {
    const item = items[I];
    if (item.id === query) {
      receiver.push(SignatureCarrier.get(items[I], GenerateItem));
    }
  }
}

function GenerateItem(item: MolangFunction): SignatureInformation {
  const out = {
    label: item.id,
    activeParameter: 0,
    documentation: item.documentation ?? "math",
    parameters: [
      { label: "math", documentation: "math" },
      { label: item.id, documentation: item.documentation },
    ],
  };

  if (item.parameters) {
    out.parameters[1].label += "(";

    out.parameters = out.parameters.concat(
      item.parameters.map((p) => {
        return { label: p.id, documentation: p.documentation };
      })
    );
  }

  return out;
}

const MathSignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Math",
      parameters: [
        { label: "math.", documentation: "The math to use." },
        { label: "<math fn>", documentation: "The function" },
      ],
    },
  ],
};

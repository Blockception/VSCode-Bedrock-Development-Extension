import { MolangData } from "bc-minecraft-molang";
import { OffsetWord } from "bc-vscode-words";
import { SignatureHelp } from "vscode-languageserver";
import { generateSignatures } from "./general";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(fn: string | undefined, cursor: number, parameters: OffsetWord[]): SignatureHelp | undefined {
  if (!fn) return MathSignature;

  return {
    activeParameter: 1,
    activeSignature: 0,
    signatures: generateSignatures("math", cursor, MolangData.General.Math, parameters, fn),
  };
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

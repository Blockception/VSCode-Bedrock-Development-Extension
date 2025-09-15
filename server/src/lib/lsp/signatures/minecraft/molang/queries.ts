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
  if (!fn) {
    return QuerySignature;
  }

  return {
    activeParameter: 1,
    activeSignature: 0,
    signatures: generateSignatures("query", cursor, MolangData.General.Queries, parameters, fn),
  };
}

const QuerySignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Query",
      parameters: [
        { label: "query.", documentation: "The query to use." },
        { label: "<query>", documentation: "The function" },
      ],
    },
  ],
};

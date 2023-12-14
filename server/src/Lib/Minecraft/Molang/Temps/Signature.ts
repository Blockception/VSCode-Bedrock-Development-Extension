import { SignatureHelp } from "vscode-languageserver-types";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(fn: string | undefined): SignatureHelp | undefined {
    TempSignature.activeParameter = fn ? 1 : 0;
  return TempSignature;
}

const TempSignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Temps",
      parameters: [
        { label: "temp.", documentation: "The temp to use." },
        { label: "<temp>", documentation: "The data to access" },
      ],
    },
  ],
};

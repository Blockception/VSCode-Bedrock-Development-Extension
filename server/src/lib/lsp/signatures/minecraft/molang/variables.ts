import { SignatureHelp } from "vscode-languageserver";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(fn: string | undefined): SignatureHelp | undefined {
  return {
    activeParameter: fn ? 1 : 0,
    activeSignature: 0,
    signatures: [
      {
        label: "Variable",
        parameters: [
          { label: "variable.", documentation: "The variable to use." },
          { label: "<variable>", documentation: "The variable to access" },
        ],
      },
    ],
  }
}
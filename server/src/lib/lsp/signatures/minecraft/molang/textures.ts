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
        label: "Texture",
        parameters: [
          { label: "texture.", documentation: "The texture to use." },
          { label: "<texture>", documentation: "The texture to access" },
        ],
      },
    ],
  };
}

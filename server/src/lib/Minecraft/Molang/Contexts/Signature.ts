import { SignatureHelp } from "vscode-languageserver-types";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(fn: string | undefined): SignatureHelp | undefined {
  ContextSignature.activeParameter = fn ? 1 : 0;
  return ContextSignature;
}

const ContextSignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Contexts",
      parameters: [
        { label: "context.", documentation: "The context to use." },
        { label: "<context>", documentation: "The data to access" },
      ],
    },
  ],
};

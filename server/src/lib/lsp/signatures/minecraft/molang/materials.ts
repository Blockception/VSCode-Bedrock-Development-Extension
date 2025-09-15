import { SignatureHelp } from "vscode-languageserver";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(): SignatureHelp | undefined {
  return MaterialSignature;
}

const MaterialSignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Material",
      parameters: [
        { label: "material.", documentation: "The material to use." },
        { label: "<material>", documentation: "The model to access" },
      ],
    },
  ],
};

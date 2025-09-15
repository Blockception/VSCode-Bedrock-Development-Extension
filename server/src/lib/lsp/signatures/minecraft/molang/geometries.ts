import { SignatureHelp } from "vscode-languageserver";

/**
 *
 * @param fn
 * @param doc
 */
export function provideSignature(): SignatureHelp | undefined {
  return GeometrySignature;
}

const GeometrySignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Geometry",
      parameters: [
        { label: "geometry.", documentation: "The geometry to use." },
        { label: "<geometry>", documentation: "The model to access" },
      ],
    },
  ],
};
import { SignatureHelp } from 'vscode-languageserver-types';

/**
 *
 * @param fn
 * @param doc
 */
 export function ProvideSignature(fn: string | undefined): SignatureHelp | undefined {
    VariableSignature.activeParameter = fn ? 1 : 0;
    return VariableSignature;
  }
  
  const VariableSignature: SignatureHelp = {
    activeParameter: 1,
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
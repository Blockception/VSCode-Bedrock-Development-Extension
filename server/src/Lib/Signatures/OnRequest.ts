import { SignatureHelp, SignatureHelpParams } from "vscode-languageserver";
import { Languages } from "../../../../shared/Constants";
import { GetDocument } from "../Types/Document/include";
import { ProvideMcfunctionSignature } from "../Types/Minecraft/Behavior/Functions/include";
import { ProvideJsonSignature } from "./Json";
import { ProvideLanguageSignature } from "./Language";

export async function OnSignatureRequestAsync(params: SignatureHelpParams): Promise<SignatureHelp | undefined> {
  return new Promise<SignatureHelp | undefined>((resolve, reject) => {
    resolve(OnSignatureRequest(params));
  });
}

function OnSignatureRequest(params: SignatureHelpParams): SignatureHelp | undefined {
  let pos = params.position;
  let doc = GetDocument(params.textDocument.uri);

  //Switch per language type
  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return ProvideMcfunctionSignature(doc, pos);

    case Languages.McLanguageIdentifier:
      return ProvideLanguageSignature(doc, pos);

    case Languages.McOtherIdentifier:
      return undefined;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return ProvideJsonSignature(doc, pos);
    //return Other.ProvideSignature(doc, pos);
  }

  return undefined;
}

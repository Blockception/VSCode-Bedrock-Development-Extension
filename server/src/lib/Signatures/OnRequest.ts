import { SignatureHelp, SignatureHelpParams } from "vscode-languageserver";
import { Languages } from "@blockception/shared";
import { Console } from '../Manager';
import { Language, Mcfunction, Molang } from "../Minecraft";
import { GetDocument } from "../Types/Document/Document";
import { provideJsonSignature } from "./Json";

export async function OnSignatureRequestAsync(params: SignatureHelpParams): Promise<SignatureHelp | undefined> {
  return Console.request("Signature", Promise.resolve(OnSignatureRequest(params)));
}

function OnSignatureRequest(params: SignatureHelpParams): SignatureHelp | undefined {
  const pos = params.position;
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  //Switch per language type
  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.provideSignature(doc, pos);

    case Languages.McLanguageIdentifier:
      return Language.provideSignature(doc, pos);

    case Languages.McMolangIdentifier:
      return Molang.provideDocSignature(doc, pos);

    case Languages.McOtherIdentifier:
      return undefined;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return provideJsonSignature(doc, pos);
  }

  return undefined;
}

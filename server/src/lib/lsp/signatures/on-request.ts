import { Console } from "../../manager";
import { GetDocument } from "../documents/document";
import { Languages } from "@blockception/shared";
import { provideJsonSignature } from "./json";
import { SignatureHelp, SignatureHelpParams } from "vscode-languageserver";

import * as Language from "./minecraft/languages";
import * as Mcfunction from "./minecraft/mcfunctions";
import * as Molang from "./minecraft/molang/main";

export async function OnSignatureRequestAsync(params: SignatureHelpParams): Promise<SignatureHelp | undefined> {
  return Console.request("Signature", () => onSignatureRequest(params));
}

function onSignatureRequest(params: SignatureHelpParams): SignatureHelp | undefined {
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

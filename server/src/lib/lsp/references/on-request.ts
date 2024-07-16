import { ReferenceParams, Location } from "vscode-languageserver";
import { Languages } from "@blockception/shared";
import { Console } from "../../manager";
import { GetDocument } from "../documents/document";

import * as Mcfunction from "./minecraft/mcfunctions";
import * as Json from "./minecraft/json";

export async function onReferencesRequestAsync(params: ReferenceParams): Promise<Location[] | undefined> {
  return Console.request("References", Promise.resolve(onReferencesRequest(params)));
}

function onReferencesRequest(params: ReferenceParams): Location[] | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.provideReferences(params, doc);

    case Languages.McOtherIdentifier:
      return;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.provideReferences(doc, params);
  }

  return undefined;
}

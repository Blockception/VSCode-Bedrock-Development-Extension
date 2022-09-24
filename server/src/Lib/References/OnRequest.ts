import { ReferenceParams, Location } from "vscode-languageserver";
import { Languages } from "../Constants";
import { Console } from "../Manager";
import { Json, Mcfunction } from "../Minecraft";
import { GetDocument } from "../Types/Document/Document";

export async function OnReferencesRequestAsync(params: ReferenceParams): Promise<Location[] | undefined> {
  return Console.request("References", Promise.resolve(OnReferencesRequest(params)));
}

function OnReferencesRequest(params: ReferenceParams): Location[] | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.ProvideReferences(params, doc);

    case Languages.McOtherIdentifier:
      return;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.ProvideReferences(doc, params);
  }

  return undefined;
}

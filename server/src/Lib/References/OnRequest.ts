import { ReferenceParams, Location } from "vscode-languageserver";
import { Languages } from "../../../../shared/Constants";
import { GetDocument } from "../Types/Document/include";
import { ProvideJsonReferences } from "./Json";
import { ProvideMcfunctionsReferences } from "./Mcfunction";

export async function OnReferencesRequestAsync(params: ReferenceParams): Promise<Location[] | undefined> {
  return new Promise<Location[] | undefined>((resolve, reject) => {
    resolve(OnReferencesRequest(params));
  });
}

function OnReferencesRequest(params: ReferenceParams): Location[] | undefined {
  let doc = GetDocument(params.textDocument.uri);

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return ProvideMcfunctionsReferences(params, doc);

    case Languages.McOtherIdentifier:
      return;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return ProvideJsonReferences(params, doc);
  }

  return undefined;
}

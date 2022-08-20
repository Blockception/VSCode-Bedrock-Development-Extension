import { DefinitionParams, Location, TypeDefinitionParams } from "vscode-languageserver";
import { Languages } from "../Constants";
import { Json, Mcfunction } from '../Minecraft';
import { GetDocument } from "../Types/Document/Document";

export function onDefinitionRequestAsync(params: DefinitionParams): Promise<Location[] | undefined> {
  return new Promise<Location[] | undefined>((resolve, reject) => {
    resolve(onDefinition(params));
  });
}

export function onTypeDefinitionRequestAsync(params: TypeDefinitionParams): Promise<Location[] | undefined> {
  return new Promise<Location[] | undefined>((resolve, reject) => {
    resolve(onDefinition(params));
  });
}

export function onDefinition(params: TypeDefinitionParams | DefinitionParams): Location[] | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.ProvideReferences(params, doc);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.ProvideReferences(doc, params);

    case Languages.McOtherIdentifier:
      break;
  }

  return [];
}

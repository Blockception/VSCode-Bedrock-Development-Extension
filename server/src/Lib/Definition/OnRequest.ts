import { DefinitionParams, Location, TypeDefinitionParams } from "vscode-languageserver";
import { Languages } from "../Constants";
import { GetDocument } from "../Types/Document/include";
import { OnJsonDefinition } from "./Json";
import { OnMcfunctionDefinition } from "./Mcfunction";

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

function onDefinition(params: TypeDefinitionParams | DefinitionParams): Location[] | undefined {
  let doc = GetDocument(params.textDocument.uri);
  let pos = params.position;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return OnMcfunctionDefinition(doc, pos);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return OnJsonDefinition(doc, pos);

    case Languages.McOtherIdentifier:
      break;
  }

  return [];
}

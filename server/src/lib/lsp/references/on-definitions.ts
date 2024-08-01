import { DefinitionParams, Location, TypeDefinitionParams } from "vscode-languageserver";
import { Languages } from "@blockception/shared";
import { Console } from "../../manager";
import { GetDocument } from "../documents/io";

import * as Json from "./minecraft/json";
import * as Mcfunction from "./minecraft/mcfunctions";

export function onDefinitionRequestAsync(params: DefinitionParams): Promise<Location[] | undefined> {
  return Console.request("Definition", () => onDefinition(params));
}

export function onTypeDefinitionRequestAsync(params: TypeDefinitionParams): Promise<Location[] | undefined> {
  return Console.request("Type Definition", () => onDefinition(params));
}

export function onDefinition(params: TypeDefinitionParams | DefinitionParams): Location[] | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.provideReferences(params, doc);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.provideReferences(doc, params);

    case Languages.McOtherIdentifier:
      break;
  }

  return [];
}

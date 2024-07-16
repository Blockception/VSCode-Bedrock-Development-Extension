import { Console } from "../../manager/console";
import { GetDocument } from "../documents/document";
import { Hover, HoverParams } from "vscode-languageserver";
import { Languages } from "@blockception/shared";

import * as Json from "./minecraft/json";
import * as Mcfunction from "./minecraft/mcfunction";
import * as Molang from "./minecraft/molang/main";

/**
 *
 * @param params
 * @returns
 */
export function onHoverRequestAsync(params: HoverParams): Promise<Hover | undefined> {
  return Console.request("Hover", Promise.resolve(onHoverRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
export function onHoverRequest(params: HoverParams): Hover | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.provideHover(params, doc);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.provideHover(doc, params);

    case Languages.McMolangIdentifier:
      return Molang.provideHover(doc, params);

    case Languages.McOtherIdentifier:
      break;
  }

  return undefined;
}

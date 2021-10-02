
import { Hover, HoverParams } from "vscode-languageserver";
import { Languages } from "../Constants";
import { Json, Mcfunction, Molang } from '../Minecraft/include';
import { GetDocument } from "../Types/Document/include";

/**
 *
 * @param params
 * @returns
 */
export function OnHoverRequestAsync(params: HoverParams): Promise<Hover | undefined> {
  return new Promise<Hover | undefined>((resolve, reject) => resolve(OnHoverRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
export function OnHoverRequest(params: HoverParams): Hover | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return Mcfunction.ProvideHover(params, doc);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return Json.ProvideHover(doc, params);
    
    case Languages.McMolangIdentifier:
      return Molang.ProvideHover(doc, params);

    case Languages.McOtherIdentifier:
      //TODO provide hover for json
      break;
  }

  return undefined;
}

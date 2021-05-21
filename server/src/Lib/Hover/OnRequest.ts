import { Hover, HoverParams } from "vscode-languageserver";
import { Languages } from "../Constants";
import { GetDocument } from "../Types/Document/include";
import { provideHoverMcFunction } from "./Mcfunction";

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
  let doc = GetDocument(params.textDocument.uri);

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return provideHoverMcFunction(params, doc);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
    case Languages.McOtherIdentifier:
      break;
  }

  return undefined;
}

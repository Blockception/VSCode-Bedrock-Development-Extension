import { Hover, HoverParams } from "vscode-languageserver";
import { GetDocument } from "../Code/include";
import { Languages } from "../Constants";
import { provideHoverMcFunction } from "./Mcfunction";

export function OnHoverRequestAsync(params: HoverParams): Promise<Hover | undefined> {
  return new Promise<Hover | undefined>((resolve, reject) => resolve(OnHoverRequest(params)));
}

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

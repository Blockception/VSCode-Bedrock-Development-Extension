import * as jsonc from "jsonc-parser";

import { TextDocument } from "../../lsp/documents";

export interface Path {
  path: string;
  property: string;
  isProperty: boolean;
}

export function getJsonPath(cursor: number, text: string | TextDocument): Path {
  if (typeof text !== "string") {
    text = text.getText();
  }
  const pos = jsonc.getLocation(text, cursor);

  return {
    property: pos.path[pos.path.length - 1].toString(),
    path: pos.path.join("/"),
    isProperty: !pos.isAtPropertyKey,
  };
}

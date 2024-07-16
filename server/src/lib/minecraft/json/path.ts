import * as jsonc from "jsonc-parser";

import { TextDocument } from "../../lsp/documents";

export interface Path {
  path: string;
  isProperty: boolean;
}

export function getJsonPath(cursor: number, text: string | TextDocument): Path {
  if (typeof text !== "string") {
    text = text.getText();
  }
  const pos = jsonc.getLocation(text, cursor);

  return {
    path: pos.path.join("/"),
    isProperty: !pos.isAtPropertyKey,
  };
}

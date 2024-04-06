import * as jsonc from 'jsonc-parser';

import { TextDocument } from '../Types/Document';

export function getJsonPath(cursor: number, text: string | TextDocument) {
  if (typeof text !== "string") {
    text = text.getText();
  }

  const pos = jsonc.getLocation(text, cursor);

  return pos.path.join('/');
}
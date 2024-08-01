import { DocumentFormattingParams, DocumentRangeFormattingParams, TextEdit } from "vscode-languageserver";
import { Replace, TrimEndFromLine, TrimStartFromLine } from "../../util/text-edit";
import { TextDocument } from "../documents/text-document";

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunction(doc: TextDocument, params: DocumentFormattingParams): TextEdit[] {
  const result: TextEdit[] = [];

  for (let index = 0; index < doc.lineCount; index++) {
    formatline(index, doc, result);
  }

  return result;
}

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunctionRange(doc: TextDocument, params: DocumentRangeFormattingParams): TextEdit[] {
  const result: TextEdit[] = [];
  const startIndex = params.range.start.line;
  const endIndex = params.range.end.line;

  for (let index = startIndex; index < endIndex; index++) {
    formatline(index, doc, result);
  }

  return result;
}

/**
 * formatts the specified line
 * @param index
 * @param document
 * @param result
 */
function formatline(index: number, document: TextDocument, result: TextEdit[]) {
  const line = document.getLine(index);

  if (line.length > 2) {
    TrimStartFromLine(line, index, result, ["/", " ", "\t"]);
    TrimEndFromLine(line, index, result, [" ", "\t"]);

    Replace(line, "~+", "~", index, result);
    Replace(line, "~0", "~", index, result);
    Replace(line, "^+", "^", index, result);
    Replace(line, "^0", "^", index, result);
    Replace(line, " ##", " \t##", index, result);
  }
}

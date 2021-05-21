import { DocumentFormattingParams, DocumentRangeFormattingParams, TextEdit } from "vscode-languageserver";
import { Replace, TrimEndFromLine, TrimStartFromLine } from "../Code/TextEdit";
import { TextDocument } from "../Types/Document/TextDocument";

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunction(doc: TextDocument, params: DocumentFormattingParams): TextEdit[] {
  let Out: TextEdit[] = [];

  for (let index = 0; index < doc.lineCount; index++) {
    formatline(index, doc, Out);
  }

  return Out;
}

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunctionRange(doc: TextDocument, params: DocumentRangeFormattingParams): TextEdit[] {
  let Out: TextEdit[] = [];
  let StartIndex = params.range.start.line;
  let EndIndex = params.range.end.line;

  for (let index = StartIndex; index < EndIndex; index++) {
    formatline(index, doc, Out);
  }

  return Out;
}

/**
 * formatts the specified line
 * @param index
 * @param document
 * @param Out
 */
function formatline(index: number, document: TextDocument, Out: TextEdit[]) {
  let Line = document.getLine(index);

  if (Line.length > 2) {
    TrimStartFromLine(Line, index, Out, ["/", " ", "\t"]);
    TrimEndFromLine(Line, index, Out, [" ", "\t"]);

    Replace(Line, "~+", "~", index, Out);
    Replace(Line, "~0", "~", index, Out);
    Replace(Line, "^+", "^", index, Out);
    Replace(Line, "^0", "^", index, Out);
    Replace(Line, " ##", " \t##", index, Out);
  }
}

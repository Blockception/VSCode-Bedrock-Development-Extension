import { DocumentFormattingParams, DocumentRangeFormattingParams } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-textdocument";
import { TrimStartFromLine } from "../../util/text-edit";
import { TextDocument } from "../documents/text-document";

export function formatLangauge(doc: TextDocument, params: DocumentFormattingParams): TextEdit[] {
  const result: TextEdit[] = [];

  for (let index = 0; index < doc.lineCount; index++) {
    formatline(index, doc, result);
  }

  return result;
}

export function formatLangaugeRange(doc: TextDocument, params: DocumentRangeFormattingParams): TextEdit[] {
  const out: TextEdit[] = [];
  const startIndex = params.range.start.line;
  const endIndex = params.range.end.line;

  for (let index = startIndex; index < endIndex; index++) {
    formatline(index, doc, out);
  }

  return out;
}

//formatts the specified line
function formatline(index: number, document: TextDocument, result: TextEdit[]) {
  const line = document.getLine(index);

  TrimStartFromLine(line, index, result, [" ", "\t"]);
}

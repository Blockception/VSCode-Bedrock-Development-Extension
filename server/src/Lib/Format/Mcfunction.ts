import { DocumentFormattingParams, DocumentRangeFormattingParams, TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../Code/include";
import { Replace, TrimEndFromLine, TrimStartFromLine } from "../Code/TextEdit";

export function formatMcfunction(doc: TextDocument, params: DocumentFormattingParams): TextEdit[] {
  let Out: TextEdit[] = [];

  for (let index = 0; index < doc.lineCount; index++) {
    formatline(index, doc, Out);
  }

  return Out;
}

export function formatMcfunctionRange(doc: TextDocument, params: DocumentRangeFormattingParams): TextEdit[] {
  let Out: TextEdit[] = [];
  let StartIndex = params.range.start.line;
  let EndIndex = params.range.end.line;

  for (let index = StartIndex; index < EndIndex; index++) {
    formatline(index, doc, Out);
  }

  return Out;
}

//formatts the specified line
function formatline(index: number, document: TextDocument, Out: TextEdit[]) {
  let Line = getLine(document, index);

  if (Line.length > 2) {
    TrimStartFromLine(Line, index, Out, ["/", " ", "\t"]);
    TrimEndFromLine(Line, index, Out, [" ", "\t"]);

    Replace(Line, "~+", "~", index, Out);
    Replace(Line, "~0", "~", index, Out);
    Replace(Line, "^+", "^", index, Out);
    Replace(Line, "^0", "^", index, Out);
    Replace(Line, "~~~", "~ ~ ~", index, Out);
  }
}

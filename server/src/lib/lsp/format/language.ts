import { DocumentFormattingParams, DocumentRangeFormattingParams, FormattingOptions } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-textdocument";
import { TrimStartFromLine } from "../../util/text-edit";
import { TextDocument } from "../documents/text-document";
import { Context } from '../context/context';
import { FormatContext } from './context';

export function formatLangauge(context: Context<FormatContext>, params: DocumentFormattingParams): TextEdit[] {
  const formatter = new McfunctionFormatter(params, context);

  return formatter.format(context.document, 0, context.document.lineCount);
}

export function formatLangaugeRange(context: Context<FormatContext>, params: DocumentRangeFormattingParams): TextEdit[] {
  const formatter = new McfunctionFormatter(params, context);
  const startLine = params.range.start.line;
  const endLine = params.range.end.line;

  return formatter.format(context.document, startLine, endLine);
}

class McfunctionFormatter {
  options: FormattingOptions;
  context: Context<FormatContext>;

  constructor(params: DocumentFormattingParams | DocumentRangeFormattingParams, context: Context<FormatContext>) {
    this.options = params.options;
    this.context = context;
  }

  format(document: TextDocument, startLine: number, endLine: number): TextEdit[] {
    this.context.logger.info(`formatting document`)

    const result: TextEdit[] = [];
    for (let index = startLine; index < endLine; index++) {
      this.formatline(index, document, result);
    }

    return result;
  }

  formatline(index: number, document: TextDocument, result: TextEdit[]) {
    const line = document.getLine(index);

    TrimStartFromLine(line, index, result, [" ", "\t"]);
  }
}

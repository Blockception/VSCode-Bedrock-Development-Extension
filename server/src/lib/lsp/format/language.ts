import { DocumentFormattingParams, DocumentRangeFormattingParams, FormattingOptions } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-textdocument";
import { TrimEndFromLine, TrimStartFromLine } from "../../util/text-edit";
import { TextDocument } from "../documents/text-document";
import { Context } from "../context/context";
import { FormatContext } from "./context";
import { ProgressBar } from "../progress";

export function formatLangauge(context: Context<FormatContext>, params: DocumentFormattingParams): TextEdit[] {
  const formatter = new LanguageFormatter(params, context);
  return formatter.format(context.document, 0, context.document.lineCount);
}

export function formatLangaugeRange(
  context: Context<FormatContext>,
  params: DocumentRangeFormattingParams
): TextEdit[] {
  const formatter = new LanguageFormatter(params, context);
  const startLine = params.range.start.line;
  const endLine = params.range.end.line;

  return formatter.format(context.document, startLine, endLine);
}

class LanguageFormatter {
  options: FormattingOptions;
  context: Context<FormatContext>;

  constructor(params: DocumentFormattingParams | DocumentRangeFormattingParams, context: Context<FormatContext>) {
    this.options = params.options;
    this.context = context;
  }

  format(document: TextDocument, startLine: number, endLine: number): TextEdit[] {
    const reporter = new ProgressBar(this.context.workDoneProgress, `formatting: ${document.filename()}`);
    this.context.logger.info(`formatting document`);

    const result: TextEdit[] = [];
    for (let index = startLine; index < endLine; index++) {
      const line = document.getLine(index);

      TrimStartFromLine(line, index, result, [" ", "\t"]);
      if (this.options.trimTrailingWhitespace) {
        //TODO: check if line doesn't end with \r\n or \n
        TrimEndFromLine(line, index, result, [" ", "\t"]);
      }
  
      //TODO: this.options.insertFinalNewline
      //TODO: this.options.trimFinalNewlines
    }

    reporter.done();
    reporter.sendProgress();
    return result;
  }
}

import {
  DocumentFormattingParams,
  DocumentRangeFormattingParams,
  FormattingOptions,
  TextEdit,
} from "vscode-languageserver";
import { Replace, TrimEndFromLine, TrimStartFromLine } from "../../util/text-edit";
import { TextDocument } from "../documents/text-document";
import { FormatContext } from "./context";
import { Context } from "../context/context";

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunction(context: Context<FormatContext>, params: DocumentFormattingParams): TextEdit[] {
  const formatter = new MCFunctionFormatter(params, context);

  return formatter.format(context.document, 0, context.document.lineCount);
}

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunctionRange(
  context: Context<FormatContext>,
  params: DocumentRangeFormattingParams
): TextEdit[] {
  const startIndex = params.range.start.line;
  const endIndex = params.range.end.line;
  const formatter = new MCFunctionFormatter(params, context);

  return formatter.format(context.document, startIndex, endIndex);
}

class MCFunctionFormatter {
  options: FormattingOptions;
  context: Context<FormatContext>;

  constructor(params: DocumentFormattingParams | DocumentRangeFormattingParams, context: Context<FormatContext>) {
    this.options = params.options;
    this.context = context;
  }

  format(document: TextDocument, startIndex: number, endIndex: number): TextEdit[] {
    const result: TextEdit[] = [];

    for (let index = startIndex; index < endIndex; index++) {
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

    return result;
  }
}

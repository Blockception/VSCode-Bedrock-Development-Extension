import { DocumentFormattingParams, DocumentRangeFormattingParams } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-textdocument";
import { Languages } from "@blockception/shared";
import { Console } from "../Manager";
import { GetDocument } from "../Types/Document/Document";
import { formatLangauge, formatLangaugeRange } from "./Language";
import { formatMcfunction, formatMcfunctionRange } from "./Mcfunction";

/**
 *
 * @param params
 * @returns
 */
export function OnDocumentFormatRequestAsync(params: DocumentFormattingParams): Promise<TextEdit[] | undefined> {
  return Console.request("Formatting Document", Promise.resolve(OnDocumentFormatRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
export function OnDocumentRangeFormatRequestAsync(
  params: DocumentRangeFormattingParams
): Promise<TextEdit[] | undefined> {
  return Console.request("Formatting Document", Promise.resolve(OnDocumentRangeFormatRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
function OnDocumentFormatRequest(params: DocumentFormattingParams): TextEdit[] | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return formatMcfunction(doc, params);

    case Languages.McLanguageIdentifier:
      return formatLangauge(doc, params);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      break;
  }

  return undefined;
}

/**
 *
 * @param params
 * @returns
 */
function OnDocumentRangeFormatRequest(params: DocumentRangeFormattingParams): TextEdit[] | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return formatMcfunctionRange(doc, params);

    case Languages.McLanguageIdentifier:
      return formatLangaugeRange(doc, params);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
    default:
  }

  return [];
}

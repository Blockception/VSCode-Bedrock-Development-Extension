import { DiagnosticSeverity } from "vscode-languageserver";
import { Range } from "vscode-languageserver-textdocument";
import { DiagnosticsBuilder } from "./Builder";

/**
 * @deprecated Use the builder normally
 * @param builder
 * @param Line
 * @param start
 * @param end
 * @param message
 */
export function NewError(builder: DiagnosticsBuilder, Line: number, start: number, end: number, message: string) {
  builder.Add(message, { start: { character: start, line: Line }, end: { character: end, line: Line } });
}

/**
 * * @deprecated Use the builder normally
 * @param builder
 * @param range
 * @param message
 */
export function NewError2(builder: DiagnosticsBuilder, range: Range, message: string) {
  builder.Add(message, range);
}

/**
 ** @deprecated Use the builder normally
 * @param builder
 * @param range
 * @param message
 */
export function NewWarning(builder: DiagnosticsBuilder, range: Range, message: string) {
  builder.Add(message, range, DiagnosticSeverity.Warning);
}

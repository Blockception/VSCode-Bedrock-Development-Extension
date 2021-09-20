import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../../Types/Document/TextDocument";
import { Commands } from "../include";

/**
 *
 * @param doc
 * @param pos
 * @returns
 */
export function ProvideSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  const Line = doc.getLine(pos.line);
  return Commands.Command.ProvideSignature(Line, doc.offsetAt({ character: 0, line: pos.line }), doc.offsetAt(pos), doc);
}

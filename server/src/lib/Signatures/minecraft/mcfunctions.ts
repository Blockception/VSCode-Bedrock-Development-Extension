import { Position } from "vscode-languageserver-textdocument";
import { SignatureHelp } from "vscode-languageserver";
import { TextDocument } from "../../types/Document/TextDocument";
import * as Command from "./commands/commands";

/**
 *
 * @param doc
 * @param pos
 * @returns
 */
export function provideSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  const Line = doc.getLine(pos.line);
  return Command.provideSignature(Line, doc.offsetAt({ character: 0, line: pos.line }), doc.offsetAt(pos), doc);
}

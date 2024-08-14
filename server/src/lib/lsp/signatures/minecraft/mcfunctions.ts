import { Position } from "vscode-languageserver-textdocument";
import { SignatureHelp } from "vscode-languageserver";
import { TextDocument } from "../../documents/text-document";

import * as Command from "./commands";

/**
 * Provides the signature of the command
 * @param doc
 * @param pos
 * @returns
 */
export function provideSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  const line = doc.getLine(pos.line).trimEnd();
  return Command.provideSignature(
    line,
    doc.offsetAt({ character: 0, line: pos.line }),
    doc.offsetAt(pos),
    doc
  );
}

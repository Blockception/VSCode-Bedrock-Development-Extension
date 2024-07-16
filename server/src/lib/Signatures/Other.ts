import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../types/Document/TextDocument";

export function provideOtherSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  return undefined;
}

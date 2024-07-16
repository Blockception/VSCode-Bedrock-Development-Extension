import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../documents/text-document";

export function provideOtherSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  return undefined;
}

import { SignatureHelp } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";

export function ProvideOtherSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  return undefined;
}

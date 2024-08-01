import { TextDocumentChangeEvent } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Glob } from "../../../files/glob";
import { Console } from "../../../manager/console";
import { Process } from "../../process/document";
import { GetDocument } from '../../documents/io';

export async function OnDocumentChangedAsync(e: TextDocumentChangeEvent<TextDocument>): Promise<void> {
  return new Promise((resolve, reject) => {

  });
}

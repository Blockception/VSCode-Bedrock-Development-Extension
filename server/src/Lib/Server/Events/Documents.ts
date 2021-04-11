import { TextDocumentChangeEvent } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { GetDocument } from "../../Code/include";
import { Process } from "../../Process/Process";

export async function OndDocumentChangedAsync(e: TextDocumentChangeEvent<TextDocument>): Promise<void> {
  return new Promise((resolve, reject) => {
    let doc = GetDocument(e.document.uri, e.document, e.document.languageId);
    Process(doc);
    resolve();
  });
}

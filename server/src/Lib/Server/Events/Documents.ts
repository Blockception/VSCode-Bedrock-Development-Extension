import { TextDocumentChangeEvent } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Glob } from "../../Glob/Glob";
import { Process } from "../../Process/Process";
import { GetDocument } from "../../Types/Document/include";

export async function OndDocumentChangedAsync(e: TextDocumentChangeEvent<TextDocument>): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = GetDocument(e.document.uri, e.document, e.document.languageId);

    if (doc) {
      const conf = doc.getConfiguration();

      if (conf.ignores.patterns.length == 0 || !Glob.IsMatch(doc.uri, conf.ignores.patterns)) {
        Process(doc);
      } else {
        console.log(`Ignored: ` + doc.uri);
      }
    }

    resolve();
  });
}

import { TextDocumentChangeEvent } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Glob } from "../../Glob/Glob";
import { Console } from "../../Manager/Console";
import { Process } from "../../Process/Process";
import { GetDocument } from '../../Types/Document/Document';

export async function OnDocumentChangedAsync(e: TextDocumentChangeEvent<TextDocument>): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = GetDocument(e.document.uri, e.document, e.document.languageId);

    if (doc) {
      const conf = doc.getConfiguration();

      if (conf.ignores.patterns.length == 0 || !Glob.IsMatch(doc.uri, conf.ignores.patterns)) {
        Process(doc);
      } else {
        Console.Log(`Ignored: ` + doc.uri);
      }
    }

    resolve();
  });
}

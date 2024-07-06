import * as fs from "fs";
import { ExecuteCommandParams, TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { Fs } from "../Code/Url";
import { Manager } from "../Manager/Manager";
import { GetDocument } from "../Types/Document/Document";

/**
 *
 */
export namespace Files {
  /**
   *
   * @param params
   * @returns
   */
  export function Append(params: ExecuteCommandParams): void {
    if (!params.arguments || params.arguments.length < 2) return;

    const uri = params.arguments[0];
    const line = params.arguments[1].trim();

    if (!(uri && line)) return;

    const doc = GetDocument(uri) ?? TextDocument.create(uri, "other", 0, "");

    const edit = TextEdit.insert(doc.positionAt(doc.getText().length), "\n" + line);
    const path = Fs.FromVscode(doc.uri);

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, line);
    } else {
      Manager.Connection.workspace.applyEdit({
        label: "Add mcdefinitions",
        edit: { documentChanges: [TextDocumentEdit.create({ uri: URI.file(path).toString(), version: doc.version }, [edit])] },
      });
    }
  }
}

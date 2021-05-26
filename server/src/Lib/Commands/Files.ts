import { ExecuteCommandParams, TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { Manager } from "../Manager/include";
import { GetDocument } from "../Types/Document/include";

export namespace Files {
  export function Append(params: ExecuteCommandParams): void {
    if (!params.arguments || params.arguments.length < 2) return;

    const uri = params.arguments[0];
    const line = params.arguments[1].trim();

    if (!(uri && line)) return;

    const doc = GetDocument(uri);

    const edit = TextEdit.insert(doc.positionAt(doc.getText().length), "\n" + line);

    Manager.Connection.workspace.applyEdit({
      edit: {
        documentChanges: [TextDocumentEdit.create({ uri: doc.uri, version: doc.version }, [edit])],
      },
    });
  }
}

import * as fs from "fs";
import { ExecuteCommandParams, TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { GetFilepath } from "../Code/Url";
import { Manager } from "../Manager/Manager";
import { GetDocument } from "../Types/Document/include";

export namespace Files {
  export function Append(params: ExecuteCommandParams): void {
    if (!params.arguments || params.arguments.length < 2) return;

    const uri = params.arguments[0];
    const line = params.arguments[1].trim();

    if (!(uri && line)) return;

    const doc = GetDocument(uri);
    if (!doc) return;

    const edit = TextEdit.insert(doc.positionAt(doc.getText().length), "\n" + line);

    const path = GetFilepath(doc.uri);

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, line);
    } else {
      Manager.Connection.workspace.applyEdit({
        label: "Add mcdefintions",
        edit: { documentChanges: [TextDocumentEdit.create(doc, [edit])] },
      });
    }
  }
}

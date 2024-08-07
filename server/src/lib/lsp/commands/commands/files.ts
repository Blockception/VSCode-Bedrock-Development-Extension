import { CreateFile, TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { Fs } from "../../../util/url";
import { CommandContext } from "../context";
import { Context } from "../../context/context";

export function appendToFile(context: Context<CommandContext>): void {
  const { arguments: args } = context;

  if (!args || args.length < 2) {
    throw new Error("wrong parameters: expected: [uri, line]");
  }

  const uri = args[0];
  const line = args[1].trim();
  if (!(uri && line)) {
    throw new Error("wrong parameters: expected: [uri, line]");
  }

  const document = context.documents.get(uri) ?? TextDocument.create(uri, "other", 0, "");
  const edit = TextEdit.insert(document.positionAt(document.getText().length), "\n" + line);
  const path = Fs.FromVscode(document.uri);

  context.connection.workspace.applyEdit({
    label: "Add mcdefinitions",
    edit: {
      documentChanges: [
        CreateFile.create(uri, { ignoreIfExists: true, overwrite: false }),
        TextDocumentEdit.create({ uri: URI.file(path).toString(), version: document.version }, [edit]),
      ],
    },
  });
}

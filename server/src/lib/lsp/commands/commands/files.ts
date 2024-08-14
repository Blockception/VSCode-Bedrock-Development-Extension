import { ApplyWorkspaceEditResult, CreateFile, TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Context } from "../../context/context";
import { CommandContext } from "../context";

export async function appendToFile(context: Context<CommandContext>): Promise<void> {
  const { arguments: args } = context;
  function handleResponse(result: ApplyWorkspaceEditResult) {
    context.logger.info("changes: ", result);

    if (result.applied === false) {
      context.logger.warn("Changes haven't been applied");
    }
  }

  if (!args || args.length < 2) {
    throw new Error("wrong parameters: expected: [uri, line]");
  }

  const uri = args[0];
  const line = args[1].trim();
  if (!(uri && line)) {
    throw new Error("wrong parameters: expected: [uri, line]");
  }

  let document: TextDocument | undefined = context.documents.get(uri);
  if (document === undefined) {
    document = TextDocument.create(uri, "other", 0, "");
    await context.connection.workspace
      .applyEdit({
        label: "creating file",
        edit: {
          documentChanges: [CreateFile.create(document.uri, { ignoreIfExists: true, overwrite: false })],
        },
      })
      .then(handleResponse);
  }

  return context.connection.workspace
    .applyEdit({
      label: "Adding line",
      edit: {
        changes: {
          [document.uri]: [TextEdit.insert(document.positionAt(document.getText().length), "\n" + line)],
        },
      },
    })
    .then(handleResponse);
}

import { Command } from "bc-minecraft-bedrock-command";
import {
  AnnotatedTextEdit,
  CodeAction,
  CodeActionKind,
  Diagnostic,
  OptionalVersionedTextDocumentIdentifier,
  TextDocumentEdit,
  TextEdit,
} from "vscode-languageserver";
import { CodeActionBuilder } from "../../../../code-action/builder";
import { Languages } from "@blockception/shared";

/**
 * Code action for `minecraft.commands.execute.deprecated`
 * @param builder
 * @param diag
 * @returns
 */
export function codeaction_execute_deprecated(builder: CodeActionBuilder, diag: Diagnostic): void {
  if (builder.doc.languageId !== Languages.McFunctionIdentifier) return;

  const doc = builder.doc;
  const line = doc.getLine(diag.range.start.line);
  const offset = doc.offsetAt(diag.range.start);

  let command = Command.parse(line, offset);
  const cursor = doc.offsetAt(diag.range.start);
  let Subcommand = command.isInSubCommand(cursor);

  while (Subcommand) {
    if (Subcommand) {
      command = Subcommand;
    }

    Subcommand = command.isInSubCommand(cursor);
  }

  if (command.parameters.length < 4) return;
  const [keyword, selector, x, y, z, detect] = command.parameters;

  if (keyword.text !== "execute") return;
  if (!selector.text.startsWith("@")) return;

  // execute <selector> <x> <y> <z>

  // execute as @a at @s positioned x y z
  if (detect.text === "detect") return;
  let newCommand = `execute as ${selector.text} at @s positioned ${x.text} ${y.text} ${z.text} run`;

  //Get full range
  const range = diag.range;
  const offsetRange = keyword.offset;
  range.end.character = range.start.character + (z.offset - offsetRange) + z.text.length;

  const id = { uri: builder.doc.uri, version: builder.doc.version };
  const edit = TextEdit.replace(diag.range, newCommand);
  const docEdit = TextDocumentEdit.create(id, [edit]);

  //Optimize
  newCommand = newCommand.replace("positioned ~ ~ ~ run", "run");

  const action: CodeAction = {
    title: `Upgrade to new execute command: '${newCommand}'`,
    kind: CodeActionKind.QuickFix,
    edit: {
      documentChanges: [docEdit],
    },
  };

  builder.Push(action);
}

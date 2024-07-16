import { Command } from "bc-minecraft-bedrock-command";
import { CommandCompletionContext } from "../../builder/context";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionItemKind } from "vscode-languageserver-types";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Position } from "vscode-languageserver-textdocument";
import { SimpleContext } from "../../../../Code/SimpleContext";

import * as Parameter from "../commands/parameters";
import * as CCommand from "../commands/commands";

/**
 *
 * @param context
 * @param pos
 * @returns
 */
export function provideCompletion(context: SimpleContext<CompletionBuilder>, pos: Position): void {
  const doc = context.doc;
  const LineIndex = pos.line;
  const Line = doc.getLine(LineIndex);

  const CommentIndex = Line.indexOf("#");

  if (CommentIndex >= 0) {
    if (pos.character > CommentIndex) return;
  }

  if (LineIndex === 0 && pos.character < 3) {
    context.receiver.add({
      label: "# <mcfunction_documentation_here>",
      documentation: "mcfunction documentation",
      kind: CompletionItemKind.Snippet,
    });
    context.receiver.add({
      label: "# region",
      documentation: "mcfunction documentation",
      kind: CompletionItemKind.Snippet,
      insertText: "# region\n# endregion",
    });
  }

  const offset = doc.offsetAt({ character: 0, line: pos.line });

  let command = Command.parse(Line, offset);
  const cursor = doc.offsetAt(pos);
  let Subcommand = command.isInSubCommand(cursor);

  while (Subcommand) {
    if (Subcommand) {
      command = Subcommand;
    }

    Subcommand = command.isInSubCommand(cursor);
  }

  provideCompletionCommand(context, doc.offsetAt(pos), command);
}

/**
 *
 * @param context
 * @param text
 * @param cursor
 * @param offset
 */
export function provideCompletionLine(
  context: SimpleContext<CompletionBuilder>,
  text: string,
  cursor: number,
  offset: number
): void {
  const command: Command = Command.parse(text, offset);
  provideCompletionCommand(context, cursor, command);
}

/**
 *
 * @param context
 * @param cursor
 * @param command
 * @returns
 */
export function provideCompletionCommand(
  context: SimpleContext<CompletionBuilder>,
  cursor: number,
  command: Command
): void {
  if (command == undefined || command.parameters.length == 0 || cursor < command.parameters[0].offset + 3) {
    CCommand.provideCompletion(context);
    return;
  }

  const Matches = command.getBestMatch(IsEducationEnabled(context.doc));

  if (Matches.length === 0) {
    if (cursor < 10) CCommand.provideCompletion(context);

    return;
  }

  const parameterIndex: number = command.findCursorIndex(cursor);
  const current = command.parameters[parameterIndex];

  for (let I = 0; I < Matches.length; I++) {
    const Match = Matches[I];
    if (Match.obsolete) {
      continue;
    }

    if (Match.parameters.length > parameterIndex) {
      const parameter = Match.parameters[parameterIndex];
      const ncontext = CommandCompletionContext.create(
        parameter,
        parameterIndex,
        command,
        cursor,
        context.receiver,
        current,
        context.doc
      );

      Parameter.provideCompletion(ncontext);
    }
  }
}

import { Command } from "bc-minecraft-bedrock-command";
import { CommandCompletionContext } from "../../Completion/Context";
import { CompletionBuilder } from "../../Completion/Builder";
import { CompletionItemKind } from "vscode-languageserver-types";
import { IsEducationEnabled } from "../../Project/Attributes";
import { Position } from "vscode-languageserver-textdocument";
import { SimpleContext } from "../../Code/SimpleContext";

import * as Parameter from "../Commands/Parameter/Completion";
import * as CCommand from "../Commands/Command/Completion";

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
    context.receiver.Add("# <mcfunction_documentation_here>", "mcfunction documentation", CompletionItemKind.Snippet);
    context.receiver.Add("# region", "mcfunction documentation", CompletionItemKind.Snippet, "# region\n# endregion");
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
 * @param pos
 * @param command
 * @returns
 */
export function provideCompletionCommand(
  context: SimpleContext<CompletionBuilder>,
  pos: number,
  command: Command
): void {
  if (command == undefined || command.parameters.length == 0 || pos < command.parameters[0].offset + 3) {
    CCommand.provideCompletion(context);
    return;
  }

  const Matches = command.getBestMatch(IsEducationEnabled(context.doc));

  if (Matches.length === 0) {
    if (pos < 10) CCommand.provideCompletion(context);

    return;
  }

  let ParameterIndex: number = command.findCursorIndex(pos);
  const Current = command.parameters[ParameterIndex];

  for (let I = 0; I < Matches.length; I++) {
    const Match = Matches[I];
    if (Match.obsolete) {
      continue;
    }

    if (Match.parameters.length > ParameterIndex) {
      const parameter = Match.parameters[ParameterIndex];
      const ncontext = CommandCompletionContext.create(
        parameter,
        ParameterIndex,
        command,
        pos,
        context.receiver,
        Current,
        context.doc
      );

      Parameter.provideCompletion(ncontext);
    }
  }
}

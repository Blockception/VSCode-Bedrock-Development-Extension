import { Command, getBestMatches } from "bc-minecraft-bedrock-command";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionItemKind } from "vscode-languageserver-types";
import { IsEducationEnabled } from "../../../../project/attributes";
import { CommandCompletionContext, CompletionContext } from "../../context";
import { Context } from "../../../context/context";

import * as Parameter from "../commands/parameters";
import * as CCommand from "../commands/commands";

/**
 *
 * @param context
 * @param pos
 * @returns
 */
export function provideCompletion(context: Context<CompletionContext>): void {
  const { document, position, cursor } = context;
  const lineIndex = position.line;
  const line = document.getLine(lineIndex);

  const commandIndex = line.indexOf("#");

  if (commandIndex >= 0) {
    if (position.character > commandIndex) return;
  }

  if (lineIndex === 0 && position.character < 3) {
    context.builder.add({
      label: "# <mcfunction_documentation_here>",
      documentation: "mcfunction documentation",
      kind: CompletionItemKind.Snippet,
    });
    context.builder.add({
      label: "# region",
      documentation: "mcfunction documentation",
      kind: CompletionItemKind.Snippet,
      insertText: "# region\n# endregion",
    });
  }

  const offset = document.offsetAt({ character: 0, line: lineIndex });

  let command = Command.parse(line, offset);
  let subCommmand = command.isInSubCommand(cursor);

  while (subCommmand) {
    if (subCommmand) {
      command = subCommmand;
    }

    subCommmand = command.isInSubCommand(cursor);
  }

  provideCompletionCommand(context, command);
}

/**
 *
 * @param context
 * @param text
 * @param cursor
 * @param offset
 */
export function provideCompletionLine(context: Context<CompletionContext>, text: string, offset: number): void {
  const command: Command = Command.parse(text, offset);
  provideCompletionCommand(context, command);
}

/**
 *
 * @param context
 * @param cursor
 * @param command
 * @returns
 */
export function provideCompletionCommand(context: Context<CompletionContext>, command: Command): void {
  const { cursor, document } = context;

  if (command == undefined || command.parameters.length == 0 || cursor < command.parameters[0].offset + 3) {
    CCommand.provideCompletion(context);
    return;
  }

  const eduEnabled = IsEducationEnabled(document);
  const matches = command.getBestMatch(eduEnabled);
  if (matches.length === 0) {
    if (cursor < 10) CCommand.provideCompletion(context);

    return;
  }

  const parameterIndex: number = command.findCursorIndex(cursor);
  const current = command.parameters[parameterIndex];
  const bestMatch = command.getBestMatch(eduEnabled)[0];

  for (let I = 0; I < matches.length; I++) {
    const Match = matches[I];
    if (Match.obsolete) {
      continue;
    }

    if (Match.parameters.length > parameterIndex) {
      const parameter = Match.parameters[parameterIndex];
      const ncontext: Context<CommandCompletionContext> = Context.modify(context, {
        command,
        current,
        parameter,
        parameterIndex,
        bestMatch,
      });

      Parameter.provideCompletion(ncontext);
    }
  }
}

import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../Types/Document/TextDocument";
import { CompletionBuilder } from "./Builder";
import { CommandCompletionContext } from "./Commands/context";
import { Command } from "bc-minecraft-bedrock-command";
import { Commands } from "../Minecraft/include";
import { IsEducationEnabled } from "../Project/include";
import { Parameter } from "../Minecraft/Commands/include";

/**
 *
 * @param doc
 * @param pos
 * @param receiver
 * @returns
 */
export function OnCompletionMcFunction(doc: TextDocument, pos: Position, receiver: CompletionBuilder): void {
  const LineIndex = pos.line;
  const Line = doc.getLine(LineIndex);

  const CommentIndex = Line.indexOf("#");

  if (CommentIndex >= 0) {
    if (pos.character > CommentIndex) return;
  }

  const offset = doc.offsetAt({ character: 0, line: pos.line });

  let command = Command.parse(Line, offset);
  const Subcommand = command.isInSubCommand(doc.offsetAt(pos));

  if (Subcommand) {
    command = Subcommand;
  }

  ProvideCompletion(doc.offsetAt(pos), receiver, command, doc);
}

/**
 *
 * @param text
 * @param cursor
 * @param offset
 * @param doc
 * @param receiver
 */
export function OnCompletionMcFunctionLine(text: string, cursor: number, offset: number, doc: TextDocument, receiver: CompletionBuilder): void {
  const command: Command = Command.parse(text, offset);
  ProvideCompletion(cursor, receiver, command, doc);
}

/**
 *
 * @param pos
 * @param receiver
 * @param command
 * @returns
 */
export function ProvideCompletion(pos: number, receiver: CompletionBuilder, command: Command, doc: TextDocument): void {
  if (command == undefined || command.parameters.length == 0 || pos < command.parameters[0].offset + 3) {
    Commands.Command.ProvideCompletion({ receiver: receiver, doc: doc });
    return;
  }

  const Matches = command.getCommandData(IsEducationEnabled(doc));

  if (Matches.length === 0) {
    if (pos < 10) Commands.Command.ProvideCompletion({ receiver: receiver, doc: doc });

    return;
  }

  const ParameterIndex = command.parameters.findIndex((p) => p.offset <= pos && p.offset + p.text.length >= pos);
  const Current = command.parameters[ParameterIndex];

  for (let I = 0; I < Matches.length; I++) {
    const Match = Matches[I];

    if (Match.parameters.length > ParameterIndex) {
      const parameter = Match.parameters[ParameterIndex];
      const context = CommandCompletionContext.create(parameter, ParameterIndex, command, pos, receiver, Current, doc);

      Parameter.ProvideCompletion(context);
    }
  }
}

import { Position } from "vscode-languageserver-textdocument";
import { Command, Parameter } from "../Types/Commands/include";
import { CommandIntr, IsInSubCommand } from "../Types/Commands/Interpertation/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { CompletionBuilder } from "./Builder";
import { CommandCompletionContext } from "./Commands/Context";

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

  let command: CommandIntr = CommandIntr.parse(Line, pos, doc.uri);
  const Subcommand = IsInSubCommand(command, pos.character);

  if (Subcommand) {
    command = Subcommand;
  }

  ProvideCompletion(pos, receiver, command, doc);
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
  const pos = doc.positionAt(cursor);
  const posB = doc.positionAt(offset);

  pos.character -= posB.character;

  const command: CommandIntr = CommandIntr.parse(text, pos, doc.uri);
  ProvideCompletion(pos, receiver, command, doc);
}

/**
 *
 * @param pos
 * @param receiver
 * @param command
 * @returns
 */
export function ProvideCompletion(pos: Position, receiver: CompletionBuilder, command: CommandIntr, doc: TextDocument): void {
  if (command == undefined || command.Parameters.length == 0 || pos.character < 3) {
    Command.ProvideCompletion(receiver);
    return;
  }

  const Matches = command.GetCommandData(doc.getConfiguration().settings.Education.Enable);

  if (Matches.length === 0) {
    if (pos.character < 10) Command.ProvideCompletion(receiver);

    return;
  }

  const ParameterIndex = command.CursorParamater;
  const Current = command.GetCurrent();

  for (let I = 0; I < Matches.length; I++) {
    const Match = Matches[I];

    if (Match.Command.parameters.length > ParameterIndex) {
      const parameter = Match.Command.parameters[ParameterIndex];
      const Context = CommandCompletionContext.create(parameter, ParameterIndex, command, pos, receiver, Current, doc);

      Parameter.ProvideCompletion(Context);
    }
  }
}

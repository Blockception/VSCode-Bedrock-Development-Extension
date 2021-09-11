import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../Types/Document/TextDocument";
import { CompletionBuilder } from "./Builder";
import { CommandCompletionContext } from "./Commands/Context";
import { Command } from "bc-minecraft-bedrock-command";

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
  const command: Command = Command.parse(text, offset);
  ProvideCompletion(pos, receiver, command, doc);
}

/**
 *
 * @param pos
 * @param receiver
 * @param command
 * @returns
 */
export function ProvideCompletion(pos: Position, receiver: CompletionBuilder, command: Command, doc: TextDocument): void {
  if (command == undefined || command.Parameters.length == 0 || pos.character < 3) {
    Command.ProvideCompletion(receiver);
    return;
  }

  const Matches = command.GetCommandData(IsEducationEnabled(doc));

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

import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../Code/include";
import { Command, Parameter } from "../Types/Commands/include";
import { CommandIntr, IsInSubCommand } from "../Types/Commands/Interpertation/include";
import { CompletionBuilder } from "./Builder";
import { CommandCompletionContext } from "./Commands/Context";

export function OnCompletionMcFunction(doc: TextDocument, pos: Position, receiver: CompletionBuilder): void {
  const LineIndex = pos.line;
  const Line = getLine(doc, LineIndex);

  let CommentIndex = Line.indexOf("#");

  if (CommentIndex >= 0) {
    if (pos.character > CommentIndex) return;
  }

  let command: CommandIntr = CommandIntr.parse(Line, pos, doc.uri);

  let Subcommand = IsInSubCommand(command, pos.character);

  if (Subcommand) {
    command = Subcommand;
  }

  ProvideCompletion(pos, receiver, command);
}

export function OnCompletionMcFunctionLine(text: string, cursor: number, offset: number, doc: TextDocument, receiver: CompletionBuilder): void {
  let pos = doc.positionAt(cursor);
  let posB = doc.positionAt(offset);

  pos.character -= posB.character;

  let command: CommandIntr = CommandIntr.parse(text, pos, doc.uri);
  ProvideCompletion(pos, receiver, command);
}

export function ProvideCompletion(pos: Position, receiver: CompletionBuilder, command: CommandIntr): void {
  if (command == undefined || command.Parameters.length == 0 || pos.character < 3) {
    Command.ProvideCompletion(receiver);
    return;
  }

  let Matches = command.GetCommandData();

  if (Matches.length === 0) {
    if (pos.character < 10) Command.ProvideCompletion(receiver);

    return;
  }

  let ParameterIndex = command.CursorParamater;
  let Current = command.GetCurrent();

  for (let I = 0; I < Matches.length; I++) {
    let Match = Matches[I];

    if (Match.Command.parameters.length > ParameterIndex) {
      let parameter = Match.Command.parameters[ParameterIndex];
      let Context = CommandCompletionContext.create(parameter, ParameterIndex, command, pos, receiver, Current);

      Parameter.ProvideCompletion(Context);
    }
  }
}

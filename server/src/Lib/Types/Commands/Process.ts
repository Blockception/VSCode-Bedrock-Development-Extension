import { LocationWord } from "bc-vscode-words";
import { Position } from "vscode-languageserver";
import { ProcessScoreboardCommand, ProcessTickingAreaCommand } from "../../Process/Commands/include";
import { ProcessTagCommand } from "../../Process/Commands/Tag";
import { TextDocument } from "../Document/TextDocument";
import { CommandIntr, GetSubCommand } from "./Interpertation/include";

export function ProcessCommand(Line: string, Start: Position, document: TextDocument): void {
  if (Line.startsWith("#")) return;
  let Command: CommandIntr | undefined = CommandIntr.parse(Line, { character: 0, line: 0 }, document.uri, Start);

  while (Command) {
    if (Command.Parameters.length === 0) break;

    switch (Command.Parameters[0].text) {
      case "tag":
        ProcessTagCommand(Command, document);
        break;

      case "scoreboard":
        ProcessScoreboardCommand(Command, document);
        break;

      case "tickingarea":
        ProcessTickingAreaCommand(Command);
        break;
    }

    Command = GetSubCommand(Command);
  }
}

export function ProcessWord(Word: LocationWord, document: TextDocument): void {
  return ProcessCommand(Word.text, Word.location.range.start, document);
}

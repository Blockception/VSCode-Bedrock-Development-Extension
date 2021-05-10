import { Location } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { getLine } from "../Code/include";
import { CommandIntr, GetSubCommand, IsInSubCommand } from "../Types/Commands/Interpertation/include";
import { MCCommandParameterType } from "../Types/Commands/Parameter/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { SearchDefinition } from "./Search";

export function OnMcfunctionDefinition(doc: TextDocument, pos: Position): Location[] | undefined {
  let Line = doc.getLine(pos.line);

  if (Line === "") return undefined;

  let Command: CommandIntr | undefined = CommandIntr.parse(Line, pos, doc.uri);

  while (IsInSubCommand(Command, pos.character)) {
    Command = GetSubCommand(Command);

    if (Command === undefined) return;
  }

  let Data = Command.GetCommandData();
  if (Data.length == 0) return undefined;

  let PIndex = Command.CursorParamater;
  let Types: MCCommandParameterType[] = [];
  let Current = Command.GetCurrent();

  if (Current == undefined) return;

  let Text = Current.text.trim();

  for (let index = 0; index < Data.length; index++) {
    const pattern = Data[index];
    const parameters = pattern.Command.parameters;

    if (parameters.length > PIndex) {
      let par = pattern.Command.parameters[PIndex];

      if (!Types.includes(par.Type)) {
        Types.push(par.Type);
      }
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

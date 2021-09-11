import { Location } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { CommandIntr, GetSubCommand, IsInSubCommand } from "../Types/Commands/Interpertation/include";
import { MCCommandParameterType } from "../Minecraft/Commands/Parameter/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { SearchDefinition } from "./Search";

export function OnMcfunctionDefinition(doc: TextDocument, pos: Position): Location[] | undefined {
  const Line = doc.getLine(pos.line);

  if (Line === "") return undefined;

  let Command: CommandIntr | undefined = CommandIntr.parse(Line, pos, doc.uri);

  while (IsInSubCommand(Command, pos.character)) {
    Command = GetSubCommand(Command, doc.getConfiguration().settings.Education.Enable);

    if (Command === undefined) return;
  }

  const Data = Command.GetCommandData(doc.getConfiguration().settings.Education.Enable);
  if (Data.length == 0) return undefined;

  const PIndex = Command.CursorParamater;
  const Types: MCCommandParameterType[] = [];
  const Current = Command.GetCurrent();

  if (Current == undefined) return;

  const Text = Current.text.trim();

  for (let index = 0; index < Data.length; index++) {
    const pattern = Data[index];
    const parameters = pattern.Command.parameters;

    if (parameters.length > PIndex) {
      const par = pattern.Command.parameters[PIndex];

      if (!Types.includes(par.Type)) {
        Types.push(par.Type);
      }
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

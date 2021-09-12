import { Location, Position } from "vscode-languageserver";
import { TextDocument } from "../Types/Document/TextDocument";
import { SearchDefinition } from "./Search";
import { IsEducationEnabled } from "../Project/include";
import { Command, ParameterType } from "bc-minecraft-bedrock-command";

export function OnMcfunctionDefinitionDoc(doc: TextDocument, cursor: Position): Location[] | undefined {
  const LineP = Position.create(cursor.line, 0);
  const Line = doc.getLine(cursor.line);
  const coffset = doc.offsetAt(cursor);
  const offset = doc.offsetAt(LineP);

  if (Line === "") return undefined;

  return OnMcfunctionDefinition(Line, offset, coffset, IsEducationEnabled(doc));
}

export function OnMcfunctionDefinition(line: string, offset: number, cursor: number, edu: boolean = false): Location[] | undefined {
  if (line === "") return undefined;

  let command = Command.parse(line, offset);

  let out = command.isInSubCommand(cursor, edu);
  while (out) {
    command = out;
    out = command.isInSubCommand(cursor, edu);
  }

  const Data = command.getCommandData(edu);
  if (Data.length == 0) return undefined;

  const PIndex = command.findCursorIndex(cursor);
  const Types: ParameterType[] = [];
  const Current = command.parameters[PIndex];

  if (Current == undefined) return;

  const Text = Current.text.trim();

  for (let index = 0; index < Data.length; index++) {
    const pattern = Data[index];
    const parameters = pattern.parameters;

    if (parameters.length > PIndex) {
      const par = pattern.parameters[PIndex];

      if (!Types.includes(par.type)) {
        Types.push(par.type);
      }
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

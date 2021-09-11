import { ReferenceParams, Location, Position } from "vscode-languageserver";
import { SearchDefinition } from "../Definition/Search";
import { TextDocument } from "../Types/Document/TextDocument";
import { IsEducationEnabled } from "../Project/Attributes";
import { Command, ParameterType } from "bc-minecraft-bedrock-command";

export function ProvideMcfunctionsReferences(params: ReferenceParams, doc: TextDocument): Location[] | undefined {
  //Gets start of line
  const startP = Position.create(params.position.line, 0);
  const Line = doc.getLine(startP.line);

  const offset = doc.offsetAt(params.position);
  const com = Command.parse(Line, offset);

  const data = com.getCommandData(IsEducationEnabled(doc.getConfiguration()));

  if (data.length == 0) return undefined;

  const cursor = doc.offsetAt(params.position);
  const Index = com.findCursorIndex(cursor);

  if (Index < 0) return;

  const parameter = com.parameters[Index];
  const Text = parameter.text;
  const Types: ParameterType[] = [];

  for (let I = 0; I < data.length; I++) {
    const Pattern = data[I];
    const Parameters = Pattern.parameters;

    if (Parameters.length >= Index) {
      Types.push(Parameters[Index].type);
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

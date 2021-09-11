import { ReferenceParams, Location } from "vscode-languageserver";
import { SearchDefinition } from "../Definition/Search";
import { CommandIntr } from "../Types/Commands/Interpertation/include";
import { MCCommandParameterType } from "../Minecraft/Commands/Parameter/include";
import { TextDocument } from "../Types/Document/TextDocument";

export function ProvideMcfunctionsReferences(params: ReferenceParams, doc: TextDocument): Location[] | undefined {
  const Line = doc.getLine(params.position.line);
  const com = CommandIntr.parse(Line, params.position, doc.uri);

  const data = com.GetCommandData(doc.getConfiguration().settings.Education.Enable);

  if (data.length == 0) {
    return undefined;
  }

  const Types: MCCommandParameterType[] = [];
  const Current = com.GetCurrent();

  if (Current == undefined) return;

  const Index = com.CursorParamater;
  const Text = Current.text;

  for (let I = 0; I < data.length; I++) {
    const Pattern = data[I];
    const Parameters = Pattern.Command.parameters;

    if (Parameters.length >= Index) {
      Types.push(Parameters[Index].Type);
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

import { ReferenceParams, Location } from "vscode-languageserver";
import { SearchDefinition } from "../Definition/Search";
import { CommandIntr } from "../Types/Commands/Interpertation/include";
import { MCCommandParameterType } from "../Types/Commands/Parameter/include";
import { TextDocument } from "../Types/Document/TextDocument";

export function ProvideMcfunctionsReferences(params: ReferenceParams, doc: TextDocument): Location[] | undefined {
  const Line = doc.getLine(params.position.line);
  let com = CommandIntr.parse(Line, params.position, doc.uri);

  let data = com.GetCommandData();

  if (data.length == 0) {
    return undefined;
  }

  let Types: MCCommandParameterType[] = [];
  let Current = com.GetCurrent();

  if (Current == undefined) return;

  let Index = com.CursorParamater;
  let Text = Current.text;

  for (let I = 0; I < data.length; I++) {
    let Pattern = data[I];
    let Parameters = Pattern.Command.parameters;

    if (Parameters.length >= Index) {
      Types.push(Parameters[Index].Type);
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

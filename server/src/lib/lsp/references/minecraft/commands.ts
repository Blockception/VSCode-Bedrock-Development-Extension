import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { OffsetWord } from "bc-vscode-words";
import { Location } from "vscode-languageserver-types";
import { References } from "../../../util/references";
import { IsEducationEnabled } from "../../../project/attributes";
import { ReferenceContext } from "../context";
import { Context } from "../../context/context";

export async function provideReferences(
  context: Context<ReferenceContext>,
  value: OffsetWord
): Promise<Location[] | undefined> {
  const { document, position } = context;
  const line = value.text;
  const offset = value.offset;

  const com = Command.parse(line, offset);
  const data = com.getBestMatch(IsEducationEnabled(document));

  if (data.length == 0) return undefined;

  const cursor = document.offsetAt(position);
  const Index = com.findCursorIndex(cursor);

  if (Index < 0) return;

  const parameter = com.parameters[Index];
  const text = parameter.text;
  const types: ParameterType[] = [];

  //Gets types used
  for (let I = 0; I < data.length; I++) {
    const Pattern = data[I];
    const Parameters = Pattern.parameters;

    if (Parameters.length > Index) {
      types.push(Parameters[Index].type);
    }
  }

  if (types.length == 0) return undefined;

  //TODO add selector references
  const references = await context.database.findReferences(text, types, context.token);
  return References.ConvertLocation(references, context.documents);
}

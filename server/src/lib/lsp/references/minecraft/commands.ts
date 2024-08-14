import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { OffsetWord } from "bc-vscode-words";
import { Location } from "vscode-languageserver-types";
import { IsEducationEnabled } from "../../../project/attributes";
import { References } from "../../../util";
import { Context } from "../../context/context";
import { ReferenceContext } from "../context";

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
  const index = com.findCursorIndex(cursor);

  if (index < 0) return;

  const parameter = com.parameters[index];
  const text = parameter.text;
  const types: ParameterType[] = [];

  //Gets types used
  for (let I = 0; I < data.length; I++) {
    const Pattern = data[I];
    const Parameters = Pattern.parameters;

    if (Parameters.length > index) {
      types.push(Parameters[index].type);
    }
  }

  if (types.length == 0) return undefined;

  //TODO add selector references
  const references = await context.database.findReferences(text, types, context.token, context.workDoneProgress);
  return References.convertLocation(references, context.documents);
}

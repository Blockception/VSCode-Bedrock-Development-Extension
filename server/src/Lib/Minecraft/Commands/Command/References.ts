import { Command, ParameterType } from 'bc-minecraft-bedrock-command';
import { OffsetWord } from 'bc-vscode-words';
import { DefinitionParams } from 'vscode-languageserver';
import { Location } from 'vscode-languageserver-types';
import { References } from '../../../Code/References';
import { Database } from '../../../include';
import { IsEducationEnabled } from '../../../Project/Attributes';
import { TextDocument } from '../../../Types/Document/include';

export function ProvideReferences(value : OffsetWord, params: DefinitionParams, doc : TextDocument) : Location[] | undefined {
	const Line = value.text;
	const offset = value.offset;

	const com = Command.parse(Line, offset);

  const data = com.getBestMatch(IsEducationEnabled(doc));

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

    if (Parameters.length > Index) {
      Types.push(Parameters[Index].type);
    }
  }

  if (Types.length == 0) return undefined;

	const out : Location[] = [];
  return References.ConvertLocation(Database.Database.FindReferences(Text, Types));
}
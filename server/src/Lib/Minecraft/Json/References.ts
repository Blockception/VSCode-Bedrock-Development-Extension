import { DefinitionParams, Location, Range, ReferenceParams } from "vscode-languageserver-protocol";
import { GetCurrentElement } from "./Functions";
import { TextDocument } from "../../Types/Document/TextDocument";
import { OffsetWord } from "bc-vscode-words";
import { IsMolang } from '../Molang/Functions';
import { Commands, Molang } from '../include';
import { Database } from '../../include';
import { ParameterType } from 'bc-minecraft-bedrock-command';
import { References } from '../../Code/References';

export function ProvideReferences(doc: TextDocument, params: DefinitionParams | ReferenceParams): Location[] | undefined {
  const pos = params.position;

  const Text = doc.getText();
  const ElementRange = GetCurrentElement(Text, doc.offsetAt(pos));

  if (!ElementRange) return undefined;

  const value = new OffsetWord(Text.slice(ElementRange.start, ElementRange.end), ElementRange.start);
  const Out: Location[] = [];

  //Find references in document
  if (IsMolang(value.text)) {
    //Command
    if (value.text.startsWith("/")) {
      return Commands.Command.ProvideReferences(new OffsetWord(value.text.slice(1), value.offset + 1), params, doc);
    }
    //Event
    else if (value.text.startsWith("@")) {
      return References.ConvertLocation(Database.Database.FindReferences(value.text.slice(2).trim(), [ParameterType.event]));
    }
    //Molang
    else {
      return Molang.ProvideReferences(value, doc, params);
    }
  }
  else {
    ReferencesInDocument(value, doc, Out);
  }

  return Out;
}

function ReferencesInDocument(value: OffsetWord, doc: TextDocument, receiver: Location[]) {
  const Text = doc.getText();
  let Index = value.offset;
  const start = value.offset;
  const length = value.text.length;
  const end = value.offset + length;

  while (Index > -1) {
    if (Index < start || Index > end) {
      receiver.push(Location.create(doc.uri, Range.create(doc.positionAt(Index), doc.positionAt(Index + length))));
    }

    Index = Text.indexOf(value.text, Index + length);
  }
}

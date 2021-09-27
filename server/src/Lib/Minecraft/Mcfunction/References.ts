import { OffsetWord } from 'bc-vscode-words';
import { DefinitionParams, Location, Position, ReferenceParams } from 'vscode-languageserver';
import { TextDocument } from '../../Types/Document/include';
import { Commands } from '../include';

export function ProvideReferences(params: DefinitionParams | ReferenceParams, doc: TextDocument): Location[] | undefined {
  //Gets start of line
  const startP = Position.create(params.position.line, 0);
  const Line = doc.getLine(startP.line);
  const lineOffset = doc.offsetAt(startP);

  return Commands.Command.ProvideReferences(new OffsetWord(Line, lineOffset), params, doc);
}
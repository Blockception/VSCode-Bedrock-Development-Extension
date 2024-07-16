import { DefinitionParams, Location, Position, ReferenceParams } from 'vscode-languageserver';
import { OffsetWord } from 'bc-vscode-words';
import { TextDocument } from '../../types/Document/TextDocument';

import * as Command from './commands';

export function provideReferences(params: DefinitionParams | ReferenceParams, doc: TextDocument): Location[] | undefined {
  //Gets start of line
  const startP = Position.create(params.position.line, 0);
  const Line = doc.getLine(startP.line);
  const lineOffset = doc.offsetAt(startP);

  return Command.provideReferences(new OffsetWord(Line, lineOffset), params, doc);
}
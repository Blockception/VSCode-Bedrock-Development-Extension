import { OffsetWord } from 'bc-vscode-words';
import { TextDocument } from '../documents';
import { Character } from '../../util';

export function getCurrentWord(document: TextDocument, cursor: number): OffsetWord {
  let startIndex = cursor;
  const text = document.getText();

  for (;startIndex > 0; startIndex--) {
    if (!wordCharacter(text, startIndex)) {
      startIndex++;
      break;
    }
  }

  let endIndex = startIndex;
  for (;endIndex < text.length; endIndex++) {
    if (!wordCharacter(text, endIndex)) {
      break;
    }
  }

  const s = text.slice(startIndex, endIndex);
  return new OffsetWord(s, startIndex);
}

function wordCharacter(text: string, index: number): boolean {
  const c = text.charCodeAt(index);
  if (Character.IsLetterCode(c) || Character.IsNumberCode(c))  {
    return true;
  }
  if (c === Character.Character_underscore || c === Character.Character_dash) {
    return true;
  }

  return false;
}
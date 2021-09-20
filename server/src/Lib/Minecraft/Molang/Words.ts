import { OffsetWord } from "bc-vscode-words";

const MolangWordsRegexp = /(['"][^'"]+['"]|[A-Za-z_]+|[\/\.!+\-\*\&\[\]\{\}\(\)><=:;?\|]+|@[a-z]|[0-9\.]+)/gi;

/**
 *
 * @param text
 * @param offset
 * @returns
 */
export function CreateMolangWords(text: string, offset: number): OffsetWord[] {
  return OffsetWord.Parse(text, MolangWordsRegexp, offset);
}

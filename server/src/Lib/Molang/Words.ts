import { OffsetWord } from "bc-vscode-words";

export function CreateMolangWords(text: string, offset: number): OffsetWord[] {
  return OffsetWord.Parse(text, /(['"][^'"]+['"]|[A-Za-z_]+|[\/\.!+\-\*\&\[\]\{\}\(\)><=:;?\|]+|@[a-z]|[0-9\.]+)/gi, offset);
}

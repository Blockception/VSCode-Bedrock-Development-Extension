import { OffsetWord } from "bc-vscode-words";

/**
 *
 */
export namespace Offset {
  /**
   *
   * @param word
   * @param pos
   */
  export function IsWithin(word: OffsetWord, pos: number): boolean {
    return pos >= word.offset && pos < word.offset + word.text.length;
  }

  export function charAt(word: OffsetWord, pos: number): string {
    const char = pos - word.offset;
    return word.text.charAt(char);
  }
}

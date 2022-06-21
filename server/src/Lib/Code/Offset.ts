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
    return pos >= word.offset && pos < (word.offset + word.text.length);
  }
}

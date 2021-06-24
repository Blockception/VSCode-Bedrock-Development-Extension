import { Location } from "vscode-languageserver";
import * as vs from "vscode-languageserver-textdocument";

export interface Range extends vs.Range {}

/**
 *
 */
export namespace Range {
  /**
   *
   * @param range
   * @param position
   * @returns
   */
  export function Within(range: vs.Range | Location, position: vs.Position | number): boolean {
    if (Location.is(range)) {
      range = range.range;
    }

    if (typeof position === "number") {
      //number check, assumes it on the same line
      if (range.start.character > position) return false;
      if (range.end.character < position) return false;
    } else {
      //Position check
      if (range.start.line > position.line) return false;
      if (range.start.character > position.character) return false;

      if (range.end.line < position.line) return false;
      if (range.end.character < position.character) return false;
    }

    return true;
  }
}

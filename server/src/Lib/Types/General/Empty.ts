import { Location, MarkupContent } from "vscode-languageserver";
import { Position, Range } from "vscode-languageserver-textdocument";

export namespace EmptyTypes {
  export function EmptyDocumentation(): MarkupContent {
    return { kind: "markdown", value: "" };
  }

  export function EmptyPosition(): Position {
    return { character: 0, line: 0 };
  }

  export function EmptyRange(): Range {
    return { start: { character: 0, line: 0 }, end: { character: 0, line: 0 } };
  }

  export function EmptyLocation(): Location {
    return { uri: "", range: { start: { character: 0, line: 0 }, end: { character: 0, line: 0 } } };
  }
}

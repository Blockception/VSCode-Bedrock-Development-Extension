import { Hover } from "vscode-languageserver";
import { Range } from "vscode-languageserver-textdocument";

export function provideHover(range: Range): Hover | undefined {
  return {
    contents: {
      kind: "markdown",
      value: "The raw text component",
    },
    range: range,
  };
}

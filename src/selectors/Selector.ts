import * as vscode from "vscode";

export function IsInSelector(document: vscode.TextDocument, position: vscode.Position): boolean {
  var Line = document.lineAt(position.line);
  var Text = Line.text;

  for (let index = position.character; index > 2; index--) {
    var c = Text.charAt(index);

    switch (c) {
      case "@":
        return true;
      case "]":
        return false;

      case "[":
        if (Text.charAt(index - 2) == "@") {
          var C = Text.charAt(index - 1);

          switch (C) {
            case "a":
            case "s":
            case "e":
            case "r":
            case "p":
              return true;
          }
        }

        return false;
    }
  }

  return false;
}

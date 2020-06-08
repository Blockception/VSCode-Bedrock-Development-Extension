import * as vscode from "vscode";

export function GetParameters(text: string): string[] {
  var Out = new Array();
  var startindex = 0;
  var level = 0;

  text = text.trim();

  if (text.startsWith("@")){ text = text.substring(2, text.length); }
  if (text.endsWith("]")) { text = text.substring(0, text.length - 1); }
  if (text.startsWith("[")) { text = text.substring(1, text.length); }

  for (var index = 0; index < text.length; index++) {
    var C = text.charAt(index);

    switch (C) {
      case "{":
        level++;
        break;

      case "}":
        level--;
        break;

      case ",":
        if (level > 0) break;

        if (index > startindex) {
          var parameter = text.substring(startindex, index);

          if (parameter.startsWith(",")){
            parameter = parameter.substring(1, parameter.length);
          }

          Out.push(parameter);
        }

        startindex = index + 1;

        break;
    }
  }

  if (startindex < text.length){
    var parameter = text.substring(startindex, text.length);

    if (parameter.startsWith(",")){
      parameter = parameter.substring(1, parameter.length);
    }

    Out.push(parameter);
  }

  return Out;
}

export function IsInSelector(document: vscode.TextDocument, position: vscode.Position): boolean {
  var Line = document.lineAt(position.line);
  var Text = Line.text;

  for (let index = position.character - 1; index > 0; index--) {
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

export function IsSelector(text : string): boolean {
    var Prefix = text.substring(0, 2);

    switch(Prefix){
        case "@a":
        case "@e":
        case "@s":
        case "@r":
        case "@p":
            return true;

        default:
            return false;
    }

    return false;
}

export function InScoreSection(document: vscode.TextDocument, position: vscode.Position) {
  var Line = document.lineAt(position.line);
  var Text = Line.text;

  for (let index = position.character - 1; index > 0; index--) {
    var c = Text.charAt(index);

    switch (c) {
      case "@a":
      case "[":
        return false;        
      case "{":
        return true;
    }
  }

  return false;
}

//Returns the parameter name
export function GetParameterName(document: vscode.TextDocument, position: vscode.Position) : string {
  var text = document.lineAt(position.line).text;
  var endindex = position.character
  var startindex = endindex - 1;

  var char = text.charAt(startindex);
  var loop = true;

  while (loop){
    switch(char){
      case "[":
      case ",":
        loop = false;
        break;
      default:
        loop = true;
        startindex--;
        break;
    }
  }

  return text.substring(startindex, endindex).trim();
}
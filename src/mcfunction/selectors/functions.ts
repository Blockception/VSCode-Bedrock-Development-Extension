/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

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
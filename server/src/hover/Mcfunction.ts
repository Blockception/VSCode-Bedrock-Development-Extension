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
import { HoverParams, Hover, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../code/include";
import { CommandIntr, MCCommandParameter, MCCommandParameterType } from "../minecraft/commands/include";

export function provideHoverMcFunction(params: HoverParams, doc: TextDocument): Hover | undefined {
  const pos = params.position;
  const LineIndex = pos.line;
  const Line = getLine(doc, LineIndex);

  let Command: CommandIntr = CommandIntr.parse(Line, params.position, doc.uri);
  let Data = Command.GetCommandData();

  if (Data.length === 1) {
    let Info = Data[0];
    let parameters = Info.Command.parameters;
    let Index = Command.CursorParamater;

    if (parameters.length > Index) {
      let p = parameters[Index];
      let T = Command.Paramaters[Index];
      let r = T.range;

      if (Index == 0) {
        return { contents: Info.Command.documentation, range: r };
      } else return GetHoverContent(p, r);
    }
  }

  return undefined;
}

function GetHoverContent(parameter: MCCommandParameter, range: Range): Hover | undefined {
  let title = parameter.Text;
  let doc: string = "";

  switch (parameter.Type) {
    case MCCommandParameterType.block:
      doc = "A block identifier";
      break;

    case MCCommandParameterType.boolean:
      doc = "A boolean value (true or false)";
      break;

    case MCCommandParameterType.command:
      doc = "A sub command to execute";
      break;

    case MCCommandParameterType.coordinate:
      doc = "A coordinate";
      break;

    case MCCommandParameterType.effect:
      doc = "A effect identifier";
      break;

    case MCCommandParameterType.entity:
      doc = "A entity identifier";
      break;

    case MCCommandParameterType.event:
      doc = "A event";
      break;

    case MCCommandParameterType.float:
      doc = "A float number";
      break;

    case MCCommandParameterType.function:
      doc = "A function path";
      break;

    case MCCommandParameterType.gamemode:
      doc = "A minecraft gamemode";
      break;

    case MCCommandParameterType.integer:
      doc = "An integer number";
      break;

    case MCCommandParameterType.integerTest:
      doc = "An integer number or * for highest/lowest value";
      break;

    case MCCommandParameterType.item:
      doc = "An item identifier";
      break;

    case MCCommandParameterType.jsonItem:
      doc = "The json schema for items";
      break;

    case MCCommandParameterType.jsonRawText:
      doc = "The json schema for raw text";
      break;

    case MCCommandParameterType.locateFeature:
      doc = "A locate feature";
      break;

    case MCCommandParameterType.objective:
      doc = "A scoreboard objective";
      break;

    case MCCommandParameterType.operation:
      doc = "A scoreboard math operation";
      break;

    case MCCommandParameterType.replaceMode:
      doc = "A replace mode";
      break;

    case MCCommandParameterType.selector:
      doc = "A selector that target all players, entities or fake players";
      break;

    case MCCommandParameterType.selectorPlayer:
      doc = "A selector that can only target players or fake players";
      break;

    case MCCommandParameterType.slotID:
      doc = "A slot id";
      break;

    case MCCommandParameterType.slotType:
      doc = "A slot type";
      break;

    case MCCommandParameterType.sound:
      doc = "A minecraft sound identifier";
      break;

    case MCCommandParameterType.string:
      doc = "A string";
      break;

    case MCCommandParameterType.tag:
      doc = "A minecraft tag";
      break;

    case MCCommandParameterType.target:
      doc = "A target";
      break;

    case MCCommandParameterType.unknown:
      doc = "no idea, I quit";
      break;

    case MCCommandParameterType.xp:
      doc = "A xp number";
      break;
  }

  return { contents: [title, doc], range: range };
}

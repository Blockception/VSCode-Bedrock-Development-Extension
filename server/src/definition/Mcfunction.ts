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
import { Location } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../code/include";
import { CommandIntr, GetSubCommand, IsInSubCommand } from "../types/commands/interpertation/include";
import { MCCommandParameterType } from "../types/commands/parameter/include";
import { SearchDefinition } from "./Search";

export function OnMcfunctionDefinition(doc: TextDocument, pos: Position): Location[] | undefined {
  let Line = getLine(doc, pos.line);

  if (Line === "") return undefined;

  let Command: CommandIntr | undefined = CommandIntr.parse(Line, pos, doc.uri);

  while (IsInSubCommand(Command, pos.character)) {
    Command = GetSubCommand(Command);

    if (Command === undefined) return;
  }

  let Data = Command.GetCommandData();
  if (Data.length == 0) return undefined;

  let PIndex = Command.CursorParamater;
  let Types: MCCommandParameterType[] = [];
  let Current = Command.GetCurrent();

  if (Current == undefined) return;

  let Text = Current.text.trim();

  for (let index = 0; index < Data.length; index++) {
    const pattern = Data[index];
    const parameters = pattern.Command.parameters;

    if (parameters.length > PIndex) {
      let par = pattern.Command.parameters[PIndex];

      if (!Types.includes(par.Type)) {
        Types.push(par.Type);
      }
    }
  }

  if (Types.length == 0) return undefined;

  return SearchDefinition(Text, Types);
}

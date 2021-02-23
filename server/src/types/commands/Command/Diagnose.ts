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
import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../diagnostics/Builder";
import { Manager } from "../../../manager/Manager";
import { ValidationData } from "../../../validation/include";
import { CommandIntr } from "../interpertation/include";
import { DiagnoseParameter } from "../parameter/include";

/**
 *
 * @param Command
 * @param line
 * @param validation
 * @param receiver
 */
export function DiagnoseCommand(Command: CommandIntr, line: string, validation: ValidationData, builder: DiagnosticsBuilder): void {
  let Matches = Command.GetCommandData();

  if (Matches.length === 0) {
    builder.Add('Unknown command syntax: "' + line + '"');
    return;
  }

  let Data = Matches[0];
  let max = Data.Command.parameters.length;

  if (Command.Parameters.length < max) {
    max = Command.Parameters.length;
  }

  for (let I = 0; I < max; I++) {
    DiagnoseParameter(Data.Command.parameters[I], Command.Parameters[I], validation, builder, Command);
  }
}

/**
 * Diagnoses the command parameter
 * @param data
 * @param receiver
 */
export function DiagnoseCommandParameter(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (Manager.Data.Commands.has(text)) return;

  builder.AddWord(data, 'No command found with text: "' + text + '"');
}

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
import { TextDocument } from "vscode-languageserver-textdocument";
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node';
import { getLine } from '../../../../code/include';
import { Database } from "../../../../database/include";
import { Manager } from "../../../../manager/Manager";
import { ValidationData, GetValidationData } from "../../../../validation/include";
import { CommandIntr, GetSubCommand } from '../../../commands/Command Intertation/include';
import { DiagnoseParameter } from '../../../commands/Parameter/Diagnose';
import { EmptyTypes } from '../../../general/Empty';

export function ProvideMcfunctionDiagnostics(doc: TextDocument): void {
  if (!Manager.Settings.useDiagnosticsMcfunctions) return;
  if (!Manager.State.DataGathered) return;

  let Data = Database.MinecraftProgramData.GetProjecData();
  let validation: ValidationData | undefined;

  if (Data) {
    validation = GetValidationData(Data.Workspaces);
  } else {
    validation = ValidationData.createEmpty();
  }

  DiagnoseMcFunction(doc, validation);
}

/**
 *
 * @param doc
 * @param validation
 */
export function DiagnoseMcFunction(doc: TextDocument, validation: ValidationData) {
  let receiver: Diagnostic[] = [];

  if (doc.lineCount == 0) {
    receiver.push({
      range: EmptyTypes.EmptyRange(),
      message: "Empty mcfunction found, minecraft will not lot this function",
      severity: DiagnosticSeverity.Error,
    });
  }

  let line: string = "";

  for (let index = 0; index < doc.lineCount; index++) {
    try {
      line = getLine(doc, index);
      DiagnoseLine(line, index, validation, receiver);
    } catch (error) {
      if (error.message)
        receiver.push({
          message: error.message,
          range: { start: { character: 0, line: index }, end: { character: line.length, line: index } },
        });
    }
  }

  Database.Diagnotics.SetErrors(doc.uri, receiver);
}

/**
 *
 * @param line
 * @param lineIndex
 * @param validation
 * @param receiver
 */
export function DiagnoseLine(line: string, lineIndex: number, validation: ValidationData, receiver: Diagnostic[]): void {
  line = line.trim();

  if (line === "" || line === "\r\n") return;

  if (line.startsWith("#")) {
    return;
  }

  let Command = CommandIntr.parse(line, { character: 0, line: lineIndex }, "");

  if (Command.Paramaters.length === 0) return;

  DiagnoseCommand(Command, line, validation, receiver);

  let Sub = GetSubCommand(Command);
  while (Sub) {
    DiagnoseCommand(Sub, line, validation, receiver);
    Sub = GetSubCommand(Sub);
  }
}

/**
 *
 * @param Command
 * @param line
 * @param validation
 * @param receiver
 */
export function DiagnoseCommand(Command: CommandIntr, line: string, validation: ValidationData, receiver: Diagnostic[]): void {
  let Matches = Command.GetCommandData();

  if (Matches.length === 0) {
    receiver.push({ message: 'Unknown command syntax: "' + line + '"', range: Command.Paramaters[0].range });
    return;
  }

  let Data = Matches[0];
  let max = Data.Command.parameters.length;

  if (Command.Paramaters.length < max) {
    max = Command.Paramaters.length;
  }

  for (let I = 0; I < max; I++) {
    DiagnoseParameter(Data.Command.parameters[I], Command.Paramaters[I], validation, receiver);
  }
}
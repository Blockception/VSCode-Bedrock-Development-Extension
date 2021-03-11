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
import { Position, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../../../../code/include";
import { Database } from "../../../../database/include";
import { DiagnosticsBuilder } from "../../../../diagnostics/Builder";
import { Manager } from "../../../../manager/Manager";
import { ValidationData, GetValidationData } from "../../../../validation/include";
import { DiagnoseCommand } from "../../../commands/command/include";
import { CommandIntr, GetSubCommand } from "../../../commands/interpertation/include";

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
  let Builder = new DiagnosticsBuilder(doc);

  if (doc.lineCount == 0) {
    Builder.Add("Empty mcfunction found, minecraft will not lot this function");
  }

  let line: string = "";

  for (let index = 0; index < doc.lineCount; index++) {
    try {
      line = getLine(doc, index);
      DiagnoseLine(line, Position.create(index, 0), undefined, validation, Builder);
    } catch (error) {
      if (error.message) Builder.Add(error.message, Range.create(index, 0, line.length, index));
    }
  }

  Builder.SendDiagnostics();
}

/**
 *
 * @param line
 * @param lineIndex
 * @param validation
 * @param receiver
 */
export function DiagnoseLine(line: string, StartPos: Position | undefined, Cursor: Position | undefined, validation: ValidationData, builder: DiagnosticsBuilder): void {
  line = line.trim();

  if (line === "" || line === "\r\n") return;

  if (line.startsWith("#")) {
    return;
  }

  if (!Cursor) {
    if (!StartPos) {
      Cursor = Position.create(0, 0);
    } else {
      Cursor = StartPos;
    }
  }

  let Command = CommandIntr.parse(line, Cursor, "", StartPos);

  if (Command.Parameters.length === 0) return;

  DiagnoseCommand(Command, line, validation, builder);

  let Sub = GetSubCommand(Command);
  while (Sub) {
    DiagnoseCommand(Sub, line, validation, builder);
    Sub = GetSubCommand(Sub);
  }
}

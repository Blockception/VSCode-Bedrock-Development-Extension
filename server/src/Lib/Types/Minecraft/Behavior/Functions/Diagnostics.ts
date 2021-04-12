import { Position, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../../../../Code/include";
import { Database } from "../../../../Database/include";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { Manager } from "../../../../Manager/Manager";
import { ValidationData, GetValidationData } from "../../../../Validation/include";
import { DiagnoseCommand } from "../../../Commands/Command/include";
import { CommandIntr, GetSubCommand } from "../../../Commands/Interpertation/include";

export function ProvideMcfunctionDiagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;
  if (!Manager.Settings.Diagnostics.Mcfunctions) return;

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

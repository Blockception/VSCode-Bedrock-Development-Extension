import { Position, Range } from "vscode-languageserver";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { Manager } from "../../../../Manager/Manager";
import { DiagnoseCommand } from "../../../Commands/Command/include";
import { CommandIntr, GetSubCommand } from "../../../Commands/Interpertation/include";
import { TextDocument } from "../../../Document/TextDocument";

export function ProvideMcfunctionDiagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  let set = doc.getConfiguration().settings;
  if (!set.Diagnostics.Enable) return;
  if (!set.Diagnostics.Mcfunctions) return;

  DiagnoseMcFunction(doc);
}

/**
 *
 * @param doc
 * @param validation
 */
export function DiagnoseMcFunction(doc: TextDocument) {
  let Builder = new DiagnosticsBuilder(doc);

  if (doc.lineCount == 0) {
    Builder.Add("Empty mcfunction found, minecraft will not lot this function");
  }

  let line: string = "";

  for (let index = 0; index < doc.lineCount; index++) {
    try {
      line = doc.getLine(index);
      DiagnoseLine(line, Position.create(index, 0), undefined, Builder);
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
export function DiagnoseLine(line: string, StartPos: Position | undefined, Cursor: Position | undefined, builder: DiagnosticsBuilder): void {
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

  DiagnoseCommand(Command, line, builder);

  let Sub = GetSubCommand(Command);
  while (Sub) {
    DiagnoseCommand(Sub, line, builder);
    Sub = GetSubCommand(Sub);
  }
}

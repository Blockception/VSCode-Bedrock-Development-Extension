import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { Manager } from "../../../Manager/Manager";
import { CommandIntr } from "../Interpertation/include";
import { DiagnoseParameter } from "../Parameter/include";

/**
 *
 * @param Command
 * @param line
 * @param receiver
 */
export function DiagnoseCommand(Command: CommandIntr, line: string, builder: DiagnosticsBuilder): void {
  let Matches = Command.GetCommandData();

  if (Matches.length === 0) {
    builder.Add('Unknown command syntax: "' + line + '"', Command.Parameters[0]?.location.range).code = "mcfunction.syntax.unknown";
    return;
  }

  let Data = Matches[0];
  let max = Data.Command.parameters.length;

  if (Command.Parameters.length < max) {
    max = Command.Parameters.length;
  }

  for (let I = 0; I < max; I++) {
    DiagnoseParameter(Data.Command.parameters[I], Command.Parameters[I], builder, Command);
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

  builder.AddWord(data, 'No command found with text: "' + text + '"').code = "mcfunction.command.unknown";
}

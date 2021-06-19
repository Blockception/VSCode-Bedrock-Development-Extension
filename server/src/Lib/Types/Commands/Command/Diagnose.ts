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
  const Matches = Command.GetCommandData(builder.doc.getConfiguration().settings.Education.Enable);

  if (Matches.length === 0) {
    builder.Add('Unknown command syntax: "' + line + '"', Command.Parameters[0]?.location.range).code = "mcfunction.syntax.unknown";
    return;
  }

  const Data = Matches[0];
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
export function DiagnoseCommandParameter(data: LocationWord, builder: DiagnosticsBuilder, edu: boolean): void {
  const text = data.text;

  if (Manager.Data.Vanilla.Commands.has(text)) return;

  if (Manager.Data.Edu.Commands.has(text)) {
    if (edu) return;

    builder.AddWord(data, 'Education commmand found, but education is turned off: "' + text + '"').code = "mcfunction.command.edu.invalid";
    return;
  }

  builder.AddWord(data, 'No command found with text: "' + text + '"').code = "mcfunction.command.unknown";
}

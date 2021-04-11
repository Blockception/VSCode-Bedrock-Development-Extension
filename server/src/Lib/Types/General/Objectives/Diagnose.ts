import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { ValidationData } from "../../../Validation/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { Manager } from "../../../Manager/include";

export function ProvideDiagnose(data: LocationWord, validation: ValidationData, builder: DiagnosticsBuilder): void {
  if (!Manager.Settings.Diagnostics.Objectives) return;

  const text = data.text;

  //Check rules first
  if (validation.objectives?.valid?.includes(text)) {
    return;
  }

  if (validation.objectives?.invalid?.includes(text)) {
    builder.AddWord(data, 'Objective has been blacklisted through rules: "' + text + '"');
    return;
  }

  //Does database has a reference?
  if (Database.Data.General.Objectives.HasID(text)) return;

  builder.AddWord(data, 'No objective has been created: "' + text + '"');
}

import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  var val = builder.doc.getConfiguration();
  let set = val.settings;
  if (!set.Diagnostics.Enable) return;
  if (!set.Diagnostics.Objectives) return;

  const text = data.text;

  //Check rules first
  if (val.defintions.objective.defined.includes(text)) return;

  //Excluded
  if (val.defintions.objective.excluded.includes(text)) {
    builder.AddWord(data, 'Objective has been excluded through rules: "' + text + '"').code = "objective.excluded";
    return;
  }

  //Does database has a reference?
  if (Database.Data.General.Objectives.HasID(text)) return;

  builder.AddWord(data, 'No objective has been created: "' + text + '"').code = "objective.missing";
}

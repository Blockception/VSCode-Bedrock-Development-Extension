import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnose(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (Database.Data.General.Entities.HasID(text)) return;
  if (Database.Data.General.Entities.HasID("minecraft:" + text)) return;

  builder.AddWord(data, 'No known entity found with the id: "' + text + '"');
}

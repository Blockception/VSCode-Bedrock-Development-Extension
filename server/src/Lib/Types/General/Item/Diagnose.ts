import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnose(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (Database.Data.General.Items.HasID(text)) return;

  builder.AddWord(data, 'No known item found with the id: "' + text + '"');
}

import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (Database.ProjectData.General.TickingAreas.HasID(text)) return;

  builder.AddWord(data, 'No tickingarea has been defined with the name: "' + text + '"').code = "tickingarea.missing";
}

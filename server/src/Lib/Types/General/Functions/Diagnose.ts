import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (Database.Data.General.Functions.HasID(text)) return;

  builder.AddWord(data, "No known function found with the path: " + text);
}

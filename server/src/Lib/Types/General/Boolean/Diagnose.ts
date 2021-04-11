import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnose(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (text === "false" || text === "true") return;

  builder.AddWord(data, 'Invalid boolean found: "' + text + '", must be: true or false');
}

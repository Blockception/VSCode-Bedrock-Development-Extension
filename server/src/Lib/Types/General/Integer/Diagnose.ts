import { LocationWord } from "bc-vscode-words";
import { IsInteger } from "./include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (IsInteger(text)) return;

  builder.AddWord(data, "Invalid integer").code = "integer.invalid";
}

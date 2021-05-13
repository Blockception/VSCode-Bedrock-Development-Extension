import { LocationWord } from "bc-vscode-words";
import { IsFloat } from "./include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (IsFloat(text)) return;

  builder.AddWord(data, "Invalid float").code = "float.invalid";
}

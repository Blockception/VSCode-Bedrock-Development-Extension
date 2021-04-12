import { LocationWord } from "bc-vscode-words";
import { IsCoordinate } from "./include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  const text = data.text;

  if (IsCoordinate(text)) return;

  builder.AddWord(data, "Invalid coordinate");
}

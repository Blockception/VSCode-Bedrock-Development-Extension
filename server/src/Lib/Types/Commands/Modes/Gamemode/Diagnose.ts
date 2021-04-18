import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { DiagnoseMode } from "../Diagnose";
import { GameMode } from "./Mode";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(data, GameMode, builder);
}

import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { LocateFeatureMode } from "./LocateFeature";

export function ProvideDiagnostic(Word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, LocateFeatureMode, builder);
}

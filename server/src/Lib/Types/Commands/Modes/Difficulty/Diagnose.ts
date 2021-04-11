import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { DifficultyMode } from "./Difficulty";

export function ProvideDiagnose(Word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, DifficultyMode, builder);
}

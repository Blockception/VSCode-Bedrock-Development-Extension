import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { GameMode } from "./Gamemode";

export function ProvideDiagnose(Word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, GameMode, builder);
}

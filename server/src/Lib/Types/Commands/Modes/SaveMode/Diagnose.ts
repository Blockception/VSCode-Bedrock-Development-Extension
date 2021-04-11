import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { SaveMode } from "./RideRulesMode";

export function ProvideDiagnose(Word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, SaveMode, builder);
}

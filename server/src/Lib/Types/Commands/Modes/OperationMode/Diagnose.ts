import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { OperationModes } from "./Operation";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";

export function ProvideDiagnose(Word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, OperationModes, builder);
}

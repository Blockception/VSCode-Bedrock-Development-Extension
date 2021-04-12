import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { MaskMode } from "./MaskMode";

export function ProvideDiagnostic(Word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, MaskMode, builder);
}

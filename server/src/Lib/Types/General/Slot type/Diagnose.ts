import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { DiagnoseMode } from "../../Commands/Modes/Diagnose";
import { SlotTypeModes } from "./Slot type";

export function ProvideDiagnose(word: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(word, SlotTypeModes, builder);
}

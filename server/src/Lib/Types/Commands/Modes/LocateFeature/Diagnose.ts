import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { LocateFeatureMode } from "./LocateFeature";

export function Diagnose(Word: LocationWord, Command: CommandIntr, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, LocateFeatureMode, builder);
  let Index = Command.Parameters.indexOf(Word);

  if (Index < 0) return;
}

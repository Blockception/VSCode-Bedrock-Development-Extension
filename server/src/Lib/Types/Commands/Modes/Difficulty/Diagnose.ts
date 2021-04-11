import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Interpertation/include";
import { DiagnoseMode } from "../Diagnose";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { DifficultyMode } from "./Difficulty";

export function Diagnose(Word: LocationWord, Command: CommandIntr, builder: DiagnosticsBuilder): void {
  DiagnoseMode(Word, DifficultyMode, builder);
  let Index = Command.Parameters.indexOf(Word);

  if (Index < 0) return;
}

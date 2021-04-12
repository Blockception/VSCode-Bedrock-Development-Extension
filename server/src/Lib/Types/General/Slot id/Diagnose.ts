import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../Commands/Interpertation/include";
import { GetMode } from "../../Commands/Modes/Functions";
import { SlotTypeMode, SlotTypeModes } from "../Slot type/Slot type";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { Integer } from "../include";

export function ProvideDiagnostic(word: LocationWord, Command: CommandIntr, builder: DiagnosticsBuilder): void {
  let Index = Command.Parameters.indexOf(word);

  if (Index < 0) return;

  Integer.ProvideDiagnostic(word, builder);

  const SlotType = Command.Parameters[Index - 1].text;
  const SlotID = Number.parseInt(word.text);

  let Mode = GetMode(SlotTypeModes, SlotType);

  if (SlotTypeMode.is(Mode)) {
    if (Mode.range) {
      ErrorCheck(builder, word, SlotType, SlotID, Mode.range.min, Mode.range.max);
    }
  }
}

function ErrorCheck(builder: DiagnosticsBuilder, word: LocationWord, slotType: string, value: number, min: number, max: number): void {
  if (value < min && value > max) {
    builder.AddWord(word, `Slot id '${value}' for '${slotType}' needs to be between, including: ${min} and ${max}`);
  }
}

import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(word: LocationWord, builder: DiagnosticsBuilder): void {
  if (!Database.Data.General.Sounds.HasID(word.text)) {
    builder.AddWord(word, `Unknown sound id. Doesn't seems to be defined: '${word.text}'`).code = "sound.missing";
  }
}

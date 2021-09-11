import { DiagnosticSeverity } from "vscode-languageserver";
import { LocationWord } from "bc-vscode-words";
import { ModeCollection } from "./Interface";
import { DiagnosticsBuilder } from "../../Diagnostics/Builder";

export function DiagnoseMode(Word: LocationWord, Mode: ModeCollection, builder: DiagnosticsBuilder): void {
  const Text = Word.text;

  const Modes = Mode.Modes;
  for (let I = 0; I < Modes.length; I++) {
    let Element = Modes[I];

    if (Text === Element.Name) {
      return;
    }
  }

  builder.AddWord(Word, `Unknown mode type: ${Text} for mode type: '${Mode.Name}'`).code = `${Mode.Name.toLowerCase()}.invalid`;
}

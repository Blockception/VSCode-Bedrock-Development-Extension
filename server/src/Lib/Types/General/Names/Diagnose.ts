import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord | OffsetWord | RangedWord, builder: DiagnosticsBuilder): void {
  let conf = builder.doc.getConfiguration();

  let text = data.text;

  if (text.startsWith('"')) text = text.substring(1, text.length);
  if (text.endsWith('"')) text = text.substring(0, text.length - 1);

  if (conf.defintions.name.excluded.includes(text)) {
    builder.AddWord(data, "Name as been marked through exclusion rules").code = "name.banned";
  }
}

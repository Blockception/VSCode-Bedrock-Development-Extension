import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { DiagnosticCodes } from "../../../Constants";

export function ProvideDiagnostic(data: LocationWord | OffsetWord | RangedWord, builder: DiagnosticsBuilder): void {
  let conf = builder.doc.getConfiguration();

  if (conf.defintions.name.excluded.includes(data.text)) {
    builder.AddWord(data, "Name as been marked through exclusion rules").code = DiagnosticCodes.Name.Excluded;
  }
}

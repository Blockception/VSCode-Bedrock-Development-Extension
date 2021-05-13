import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  let text = data.text;

  if (text.startsWith("[") && text.endsWith("]")) {
  } else {
    builder.AddWord(data, "block states need to start and end with []").code = "block.states.syntax";
  }
}

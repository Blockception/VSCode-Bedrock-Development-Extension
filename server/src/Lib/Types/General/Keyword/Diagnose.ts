import { LocationWord } from "bc-vscode-words";
import { MCCommandParameter } from "../../Commands/Parameter/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(pattern: MCCommandParameter, data: LocationWord, builder: DiagnosticsBuilder): void {
  if (pattern.Text !== data.text) {
    builder.AddWord(data, `expected keyword: "${pattern.Text}" but got: "${data.text}"`);
  }
}

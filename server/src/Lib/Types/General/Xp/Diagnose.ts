import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { Integer } from "../include";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  //TODO

  let text = data.text;

  if (text.endsWith("L") || text.endsWith("l")) {
    text = text.substring(0, text.length - 1);
  }

  data = new LocationWord(text, data.location.uri, data.location.range);

  Integer.ProvideDiagnostic(data, builder);
}

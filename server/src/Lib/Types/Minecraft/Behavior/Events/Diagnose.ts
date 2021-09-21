import { OffsetWord } from "bc-vscode-words";
import { DiagnosticSeverity } from "vscode-languageserver-types";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";

export function DiagnoseEvent(any: any | undefined, events: string[], Builder: DiagnosticsBuilder) {
  if (typeof any !== "object") return;

  for (const prop in any) {
    //Found an event property
    const value = any[prop];
    if (prop === "event") {
      const target = any["target"];

      if (target === "self" && typeof value === "string") {
        if (!events.includes(value)) {
          const offset = Builder.doc.getText().indexOf(value);
          Builder.AddWord(new OffsetWord(value, offset), "Couldn't find event: " + value, DiagnosticSeverity.Error).code = "event.missing";
        }
      }
    }

    if (typeof value === "object") {
      DiagnoseEvent(value, events, Builder);
    }
  }
}

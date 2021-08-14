import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../../Database/include";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  if (Database.ProjectData.Resourcepack.Particles.HasID(data.text)) return;

  builder.AddWord(data, 'No particle found in resourcepack with identifier: "' + data.text + '"').code = "particle.missing";
}

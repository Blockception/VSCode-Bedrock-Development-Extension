import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { ValidationData } from "../../../Validation/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { Manager } from "../../../Manager/include";

export function ProvideDiagnostic(data: LocationWord, validation: ValidationData, builder: DiagnosticsBuilder): void {
  if (!Manager.Settings.Diagnostics.Tags) return;

  const text = data.text;

  //Check rules first
  if (validation.tags?.valid?.includes(text)) {
    return;
  }

  if (validation.tags?.invalid?.includes(text)) {
    builder.AddWord(data, 'Tag has been blacklisted through rules: "' + text + '"');

    return;
  }

  if (Database.Data.General.Tag.HasID(text)) {
    return;
  }

  builder.AddWord(data, 'The tag: "' + text + '" never seems to get added to any type of entity');
}

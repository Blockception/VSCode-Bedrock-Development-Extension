import { LocationWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";

export function ProvideDiagnostic(data: LocationWord, builder: DiagnosticsBuilder): void {
  var conf = builder.doc.getConfiguration();
  var set = conf.settings;

  if (!set.Diagnostics.Enable) return;
  if (!set.Diagnostics.Tags) return;

  const text = data.text;

  //Check rules first
  let tags = conf.defintions.tag;
  if (tags.defined.includes(text)) {
    return;
  }

  if (tags.excluded.includes(text)) {
    builder.AddWord(data, 'Tag has been excluded through rules: "' + text + '"').code = "tag.excluded";

    return;
  }

  if (Database.ProjectData.General.Tag.HasID(text)) {
    return;
  }

  builder.AddWord(data, 'The tag: "' + text + '" never seems to get added to any type of entity').code = "tag.missing";
}

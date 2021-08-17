import { Languages } from "../Constants";
import { Manager } from "../Manager/Manager";
import { TextDocument } from "../Types/Document/TextDocument";

export function Diagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  const config = doc.getConfiguration();
  if (!config.settings.Diagnostics.Enable) return;

  switch (doc.languageId) {
    default:
      return;

    case Languages.McLanguageIdentifier:
    case Languages.McFunctionIdentifier:
      break;
    case Languages.JsonIdentifier:
    case Languages.JsonCIdentifier:
      if (!config.settings.Diagnostics.Json) return;
      break;
  }

  //Pass document to diagnoser
  Manager.Diagnoser?.Process(doc);
}

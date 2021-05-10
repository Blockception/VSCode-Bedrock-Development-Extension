import { Location } from "vscode-languageserver";
import { Database } from "../../../../Database/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
import { Sound } from "../../../General/include";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.GetObject();

  if (Format == undefined) return;

  let sound_def = Format["sound_definitions"];
  const uri = doc.uri;
  let names: string[];

  if (sound_def) {
    names = Object.getOwnPropertyNames(sound_def);
  } else {
    names = Object.getOwnPropertyNames(Format);
  }

  names.forEach((name) => {
    let position = JDoc.GetRangeOfObject(name);

    if (position == undefined) {
      position = {
        start: { character: 0, line: 0 },
        end: { character: 1, line: 0 },
      };
    }

    let s = new Sound.Sound();
    s.Identifier = name;
    s.Location = Location.create(uri, position);
    Database.Data.General.Sounds.Set(s);
  });
}

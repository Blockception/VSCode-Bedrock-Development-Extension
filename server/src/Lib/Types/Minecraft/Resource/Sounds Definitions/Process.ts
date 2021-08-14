import { Location } from "vscode-languageserver";
import { Database } from "../../../../Database/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
import { Sound } from "../../../General/include";
import { SoundDefinitions } from "./SoundDefinitions";

/**
 * Processes the text document as a behavior entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<SoundDefinitions>();

  if (Format == undefined || !Format.format_version) return;

  let sound_def = Format.sound_definitions;
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
    Database.ProjectData.General.Sounds.Set(s);
  });
}

import path from "path";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { Glob } from "../../../../Glob/Glob";
import { JsonDocument, TextDocument } from "../../../Document/include";
import { GetResourcePack } from "../Functions";
import { Sound, SoundDefinition, SoundDefinitions } from "./SoundDefinitions";

export function ProvideDiagnostic(doc: TextDocument): void {
  let Builder = new DiagnosticsBuilder(doc);
  let JDoc = new JsonDocument(doc);

  InternalDiagnose(JDoc, Builder);

  Builder.SendDiagnostics();
}

function InternalDiagnose(JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  let Format = JDoc.CastTo<SoundDefinitions>();

  if (Format == undefined || !Format.format_version) return;

  let sound_def = Format.sound_definitions;
  const uri = JDoc.doc.uri;

  if (!sound_def) return;

  const RP = GetResourcePack(uri, "sounds");
  for (let Key in sound_def) {
    Traverse(sound_def[Key], RP, JDoc, Builder);
  }
}

function Traverse(SD: SoundDefinition | undefined, RP: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!SD) return;

  SD.sounds?.forEach((data) => Check(data, RP, JDoc, Builder));
}

function Check(data: string | Sound, RP: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (typeof data === "object") {
    if (!data.name) return;

    data = data.name;
  }

  const filepath = path.join(RP, data).replace(/\\/gi, "/");

  if (Glob.GetFiles(filepath + "*").length > 0) return;

  Builder.Add("Sound does not exist: " + data, JDoc.RangeOf('"' + data + '"')).code = "sound.missing";
}

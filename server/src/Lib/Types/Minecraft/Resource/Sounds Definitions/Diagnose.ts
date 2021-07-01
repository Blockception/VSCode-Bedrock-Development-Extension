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
  const Format = JDoc.CastTo<SoundDefinitions>();

  if (Format == undefined || !Format.format_version) return;

  const sound_def = Format.sound_definitions;
  const uri = JDoc.doc.uri;

  if (!sound_def) return;

  const RP = GetResourcePack(uri, "sounds");
  const source = ["sounds/*", "sounds/**/*"];
  const Files = Glob.GetFiles(source, undefined, RP);

  for (let Key in sound_def) {
    Traverse(sound_def[Key], Files, JDoc, Builder);
  }
}

function Traverse(SD: SoundDefinition | undefined, Files: string[], JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!SD) return;

  SD.sounds?.forEach((data) => Check(data, Files, JDoc, Builder));
}

function Check(data: string | Sound, Files: string[], JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (typeof data === "object") {
    if (!data.name) return;

    data = data.name;
  }

  for (let I = 0; I < Files.length; I++) {
    //If collected files contains specific file then stop
    if (Files[I].includes(data)) return;
  }

  Builder.Add("Sound does not exist: " + data, JDoc.RangeOf('"' + data + '"')).code = "sound.missing";
}

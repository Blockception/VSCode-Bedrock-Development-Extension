import { Diagnostic } from "vscode-languageserver";
import { Manager } from "../../../Manager/Manager";
import { JsonDocument } from "../../Document/Json Document";
import { TextDocument } from "../../Document/TextDocument";
import { Manifest } from "./Manifest";

export function ProvideManifestDiagnostics(doc: TextDocument): void {
  let JDOC = new JsonDocument(doc);
  let Result = JDOC.CastToError();
  let Diags: Diagnostic[] = [];

  let Manifest = Result.value;

  if (Manifest) {
  } else {
    Diags.push({ message: JSON.stringify(Result.error), range: { start: { character: 0, line: 0 }, end: { character: 10, line: 0 } } });
  }

  Manager.Diagnostic.SendDiagnostics(doc, Diags);
}

function ExploreManifest(Manifest: Manifest, results: Diagnostic[], JDOC: JsonDocument): void {}

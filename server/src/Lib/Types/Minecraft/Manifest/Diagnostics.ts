import { Diagnostic } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../Code/Json/include";
import { Manager } from "../../../Manager/Manager";
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

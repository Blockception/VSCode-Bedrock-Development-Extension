import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { General } from "../../include";
import { AnimationController } from "./include";

export function ProvideDiagnostic(doc: TextDocument) {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<AnimationController>();

  if (!AnimationController.is(Format)) return;

  let Builder = new DiagnosticsBuilder(doc);
  General.Animation_Controllers.ProvideDiagnostic(Format, Builder);

  Builder.SendDiagnostics();
}

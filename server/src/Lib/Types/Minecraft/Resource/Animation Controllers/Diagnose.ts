import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
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

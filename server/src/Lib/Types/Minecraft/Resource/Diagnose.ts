import { TextDocument } from "vscode-languageserver-textdocument";
import { DiagnoseContext } from "../../../Diagnostics/Types/include";
import { DataType, DetectResourceType } from "../Format/include";
import { Animation_Controllers, Entity } from "./include";

export function ProvideDiagnostic(context: DiagnoseContext): void {}

export function DiagnoseJson(doc: TextDocument): void {
  const uri = decodeURI(doc.uri);
  let type = DetectResourceType(uri);

  switch (type) {
    case DataType.resource_animation_controller:
      return Animation_Controllers.ProvideDiagnostic(doc);

    case DataType.resource_entity:
      Entity.ProvideDiagnostic(doc);

    default:
      return;
  }
}

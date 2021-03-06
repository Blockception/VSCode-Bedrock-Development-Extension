import { DiagnoseContext } from "../../../Diagnostics/Types/include";
import { TextDocument } from "../../Document/TextDocument";
import { DataType, DetectResourceType } from "../Format/include";
import { Animation_Controllers, Entity, Sounds_Definitions } from "./include";

export function ProvideDiagnostic(context: DiagnoseContext): void {}

export function DiagnoseJson(doc: TextDocument): void {
  const uri = decodeURI(doc.uri);
  let type = DetectResourceType(uri);

  switch (type) {
    case DataType.resource_animation_controller:
      return Animation_Controllers.ProvideDiagnostic(doc);

    case DataType.resource_entity:
      return Entity.ProvideDiagnostic(doc);

    case DataType.resource_sounds_definitions:
      return Sounds_Definitions.ProvideDiagnostic(doc);

    default:
      return;
  }
}

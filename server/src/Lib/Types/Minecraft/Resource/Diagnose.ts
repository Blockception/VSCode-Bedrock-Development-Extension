import { TextDocument } from "vscode-languageserver-textdocument";
import { DiagnoseContext } from "../../../Diagnostics/Types/include";
import { DataType, DetectResourceType } from "../Format/include";
import { Entity } from "./include";

export function ProvideDiagnose(context: DiagnoseContext): void {}

export function DiagnoseJson(doc: TextDocument): void {
  const uri = decodeURI(doc.uri);
  let type = DetectResourceType(uri);

  switch (type) {
    case DataType.resource_entity:
      Entity.ProvideDiagnose(doc);

    default:
      return;
  }
}

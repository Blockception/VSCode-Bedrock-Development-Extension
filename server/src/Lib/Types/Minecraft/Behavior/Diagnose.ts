import { DiagnoseContext } from "../../../Diagnostics/Types/include";
import { Entities, Functions, Animation_Controllers } from "./include";
import { DataType, DetectBehaviorType } from "../Format/include";
import { TextDocument } from "../../Document/TextDocument";
import { ForEachDocument, GetDocuments } from "../../Document/include";

export function ProvideDiagnostic(context: DiagnoseContext): void {
  context.projectStructure.BehaviorPackFolders.forEach((BP) => DiagnoseFolder(BP));
}

export function DiagnoseFolder(uri: string): void {
  ForEachDocument(GetDocuments(uri, ["**/*.mcfunction"]), (D) => Functions.DiagnoseMcFunction(D));
  ForEachDocument(GetDocuments(uri, ["**/*.json"]), (D) => DiagnoseJson(D));
}

export function DiagnoseJson(doc: TextDocument): void {
  const uri = decodeURI(doc.uri);
  let type = DetectBehaviorType(uri);

  switch (type) {
    case DataType.behavior_animation_controller:
      return Animation_Controllers.ProvideDiagnostic(doc);

    case DataType.behavior_entity:
      return Entities.ProvideDiagnostic(doc);

    default:
      return;
  }
}

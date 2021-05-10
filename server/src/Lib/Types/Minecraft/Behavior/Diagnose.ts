import { Code } from "../../../include";
import { DiagnoseContext } from "../../../Diagnostics/Types/include";
import { Entities, Functions, Animation_Controllers } from "./include";
import { DataType, DetectBehaviorType } from "../Format/include";
import { TextDocument } from "../../Document/TextDocument";

export function ProvideDiagnostic(context: DiagnoseContext): void {
  context.projectStructure.BehaviourPackFolders.forEach((BP) => DiagnoseFolder(BP));
}

export function DiagnoseFolder(uri: string): void {
  Code.ForEachDocument(Code.GetDocuments(uri, ["**/*.mcfunction"]), (D) => Functions.DiagnoseMcFunction(D));
  Code.ForEachDocument(Code.GetDocuments(uri, ["**/*.json"]), (D) => DiagnoseJson(D));
}

export function DiagnoseJson(doc: TextDocument): void {
  const uri = decodeURI(doc.uri);
  let type = DetectBehaviorType(uri);

  switch (type) {
    case DataType.behaviour_animation_controller:
      return Animation_Controllers.ProvideDiagnostic(doc);

    case DataType.behaviour_entity:
      return Entities.ProvideDiagnostic(doc);

    default:
      return;
  }
}

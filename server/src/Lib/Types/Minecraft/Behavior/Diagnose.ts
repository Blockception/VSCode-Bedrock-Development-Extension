import { Code } from "../../../include";
import { DiagnoseContext } from "../../../Diagnostics/Types/include";
import { Entities, Functions } from "./include";
import { TextDocument } from "vscode-languageserver-textdocument";
import { DataType, DetectBehaviorType } from "../Format/include";

export function ProvideDiagnose(context: DiagnoseContext): void {
  context.projectStructure.BehaviourPackFolders.forEach((BP) => DiagnoseFolder(BP, context));
}

export function DiagnoseFolder(uri: string, context: DiagnoseContext): void {
  Code.ForEachDocument(Code.GetDocuments(uri, ["**/*.mcfunction"]), (D) => Functions.DiagnoseMcFunction(D, context.data));
  Code.ForEachDocument(Code.GetDocuments(uri, ["**/*.json"]), (D) => DiagnoseJson(D));
}

export function DiagnoseJson(doc: TextDocument): void {
  const uri = decodeURI(doc.uri);
  let type = DetectBehaviorType(uri);

  switch (type) {
    case DataType.behaviour_entity:
      Entities.ProvideDiagnose(doc);

    default:
      return;
  }
}

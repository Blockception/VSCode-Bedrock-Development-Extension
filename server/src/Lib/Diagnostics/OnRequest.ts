import { TextDocument } from "vscode-languageserver-textdocument";
import { Languages } from "../Constants";
import { ProvideMcfunctionDiagnostics } from "../Types/Minecraft/Behavior/Functions/include";
import { provideLanguageDiagnostics } from "../Types/Languages/Diagnose";
import { Manager } from "../Manager/Manager";
import { DetectGeneralDataType } from "../Types/Minecraft/Format/Detection";
import { GeneralDataType } from "../Types/Minecraft/Format/General Data Type";
import { Behavior, Resource } from "../Types/Minecraft/include";

export function Diagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  switch (doc.languageId) {
    case Languages.McLanguageIdentifier:
      return provideLanguageDiagnostics(doc);

    case Languages.McFunctionIdentifier:
      return ProvideMcfunctionDiagnostics(doc);

    case Languages.JsonIdentifier:
    case Languages.JsonCIdentifier:
      if (!Manager.Settings.Diagnostics.Json) return;
      break;
  }

  //If its a json file
  let type = DetectGeneralDataType(doc.uri);

  switch (type) {
    case GeneralDataType.behaviour_pack:
      return Behavior.DiagnoseJson(doc);

    case GeneralDataType.resource_pack:
      return Resource.DiagnoseJson(doc);
  }
}

import * as Json from "./Json";
import * as Language from "./Language";
import { Behavior } from "../Types/Minecraft/include";
import { Languages } from "../Constants";
import { ValidateBehaviourFolder, ValidateResourceFolder } from "./Validate";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Diagnostics } from "../Diagnostics/OnRequest";
import { Console } from "../Console/include";
import { GetFilename } from "../Code/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/include";

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);
  try {
    InternalProcess(document);
  } catch (err) {
    Console.Error(GetFilename(document.uri) + " | " + JSON.stringify(err));
  }
}

function InternalProcess(document: TextDocument): void {
  switch (document.languageId) {
    case Languages.McFunctionIdentifier:
      Behavior.Functions.Process(document);
      break;

    case Languages.McLanguageIdentifier:
      Language.ProcessLanguageFile(document);
      break;

    case Languages.McProjectIdentifier:
      Database.WorkspaceData.Update();
      return;

    case Languages.McOtherIdentifier:
      break;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      Json.ProcessJson(document);
      break;
  }

  //Validate folder
  let Type = DetectGeneralDataType(document.uri);

  switch (Type) {
    case GeneralDataType.unknown:
      break;

    case GeneralDataType.behaviour_pack:
      ValidateBehaviourFolder(document);
      break;

    case GeneralDataType.resource_pack:
      ValidateResourceFolder(document);
      break;
  }

  Diagnostics(document);
}

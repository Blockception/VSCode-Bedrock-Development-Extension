import * as Json from "./Json";
import * as Language from "./Language";
import { Behavior } from "../Types/Minecraft/include";
import { ValidateBehaviorFolder, ValidateResourceFolder } from "./Validate";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Diagnostics } from "../Diagnostics/OnRequest";
import { Console } from "../Console/include";
import { GetFilename } from "../Code/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/include";
import { Languages } from "../Constants";

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);
  try {
    Database.ProjectData.process(document);
  } catch (err) {
    Console.Error(GetFilename(document.uri) + " | " + JSON.stringify(err));
  }
}

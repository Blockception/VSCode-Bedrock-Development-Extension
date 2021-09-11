import { Console } from "../Console/include";
import { GetFilename } from "../Code/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/include";
import { Manager } from "../Manager/Manager";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);
  try {
    Database.ProjectData.process(document);

    if (Manager.State.TraversingProject == false && Manager.State.DataGathered) {
      Database.Diagnoser.Process(document);
    }
  } catch (err) {
    Console.Error(GetFilename(document.uri) + " | " + JSON.stringify(err));
  }
}

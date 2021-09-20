import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/include";
import { Manager } from "../Manager/Manager";
import { HandleError } from "../Code/Error";

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);
  try {
    Database.ProjectData.process(document);

    if (Manager.State.TraversingProject == false && Manager.State.DataGathered) {
      Database.Diagnoser.Process(document);
    }
  } catch (error) {
    HandleError(error, document);
  }
}

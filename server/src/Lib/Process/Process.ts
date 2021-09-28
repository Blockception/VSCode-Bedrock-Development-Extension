import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/include";
import { HandleError } from "../Code/Error";
import { ProvideDiagnostics } from "../Diagnostics/OnRequest";

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);
  try {
    Database.ProjectData.process(document);

    ProvideDiagnostics(document);
  } catch (error) {
    HandleError(error, document);
  }
}

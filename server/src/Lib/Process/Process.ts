import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/Database";
import { HandleError } from "../Code/Error";
import { ProvideDiagnostics } from "../Diagnostics/OnRequest";
import { Languages } from '../../../../shared/src';
import { Traverse } from "./Traverse";
import { Manager } from '../Manager/Manager';

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log("Processing: " + GetFilename(document.uri) + " | " + document.languageId);
  try {
    Database.ProjectData.process(document);

    ProvideDiagnostics(document);
  } catch (error) {
    HandleError(error, document);
  }

  if (document.languageId === Languages.McProjectIdentifier) {
    if (Manager.State.TraversingProject === false) Traverse();
  }
}

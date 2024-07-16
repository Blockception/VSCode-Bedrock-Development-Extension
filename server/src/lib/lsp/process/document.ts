import { TextDocument } from "../documents/text-document";
import { Database } from "../../database/database";
import { HandleError } from "../../Code/Error";
import { provideDiagnostics } from "../diagnostics/on-request";
import { Languages } from "@blockception/shared";
import { Traverse } from "./traverse";
import { Manager } from '../../manager/manager';

//Process the given document
export function Process(document: TextDocument): void {
  //Console.Log(`Processing: ${GetFilename(document.uri)} | ` + document.languageId);
  try {
    Database.ProjectData.process(document);

    provideDiagnostics(document);
  } catch (error) {
    HandleError(error, document);
  }

  if (document.languageId === Languages.McProjectIdentifier) {
    if (Manager.State.TraversingProject === false) Traverse();
  }
}

import { TextDocument } from "../Types/Document/TextDocument";
import { Database } from "../Database/include";
import { HandleError } from "../Code/Error";
import { ProvideDiagnostics } from "../Diagnostics/OnRequest";
import { Pack, BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { Fs } from "../Code/Url";
import { MinecraftFormat } from "../Minecraft/Format";
import { Document } from "../Types/include";
import { Console } from "../Manager/Console";

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

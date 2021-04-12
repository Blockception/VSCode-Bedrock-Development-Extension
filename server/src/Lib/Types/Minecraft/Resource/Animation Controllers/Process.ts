import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { EmptyTypes } from "../../../General/include";
import { AnimationController } from "./Animation Controller";
import { ProvideDiagnostic } from "../../General/Animation Controllers/Diagnose";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<AnimationController>();

  if (!AnimationController.is(Format)) return;

  let Names = Object.getOwnPropertyNames(Format.animation_controllers);
  for (let Index = 0; Index < Names.length; Index++) {
    const Name = Names[Index];
    let Range = JDoc.GetRangeOfObject(Name);
    let Location: Location = {
      uri: doc.uri,
      range: Range ?? EmptyTypes.EmptyRange(),
    };

    Database.Data.Resourcepack.AnimationControllers.Set(new DataReference(Name, Location));
  }
}

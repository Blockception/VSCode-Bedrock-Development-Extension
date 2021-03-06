import { Location } from "vscode-languageserver";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
import { EmptyTypes } from "../../../General/Empty";
import { RenderController } from "./Render Controller";

/**
 * Processes the text document as a behavior entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<RenderController>();

  if (!RenderController.is(Format)) return;

  let Names = Object.getOwnPropertyNames(Format.render_controllers);

  for (let Index = 0; Index < Names.length; Index++) {
    const Name = Names[Index];
    let Range = JDoc.GetRangeOfObject(Name);
    let Location: Location = {
      uri: doc.uri,
      range: Range ?? EmptyTypes.EmptyRange(),
    };

    Database.Data.Resourcepack.RenderControllers.Set(new DataReference(Name, Location));
  }
}

import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { EmptyTypes } from "../../../General/Empty";
import { Item } from "../../../General/Item/Item";

import { IsProperlyDefined, ItemImport } from "./Item Import";

/**
 * Processes the text document as a behaviour item definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<ItemImport>();

  let item: Item | undefined;

  if (IsProperlyDefined(Format)) {
    let mce = Format["minecraft:item"];
    item = new Item();

    const ID = mce.description.identifier;
    item.Identifier = ID;
    item.Location = Location.create(doc.uri, EmptyTypes.EmptyRange());
    item.Documentation.value = "The custom item definition of: " + ID;

    Database.Data.Behaviourpack.Items.Set(new DataReference(item.Identifier, item.Location));
    Database.Data.General.Items.Set(item);
  }
}

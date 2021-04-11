import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { EmptyTypes } from "../../../General/Empty";
import { Entity } from "./Entity";

export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Entity>();

  if (Entity.is(Format)) {
    let Identifier = Format["minecraft:client_entity"].description.identifier;
    let Location: Location = {
      range: EmptyTypes.EmptyRange(),
      uri: doc.uri,
    };

    Database.Data.Resourcepack.Entities.Set(new DataReference(Identifier, Location));
  }
}
